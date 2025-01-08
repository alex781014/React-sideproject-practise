import { useState, useEffect } from 'react';

export default function FeceBookFriendsList() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`https://reqres.in/api/users?page=${currentPage}`);
                const data = await response.json();

                const usersWithFriends = data.data.map(user => ({
                    ...user,
                    mutualFriends: Math.floor(Math.random() * 10)
                }));

                setUsers(usersWithFriends);
                setTotalPages(data.total_pages);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [currentPage]);

    const handleEmailClick = (email) => {
        window.location.href = `mailto:${email}`;
    };

    const handleDeleteFriend = (id) => {
        setUsers(prev => prev.filter(user => user.id !== id));
    };

    const handleProfileClick = (user) => {
        setSelectedUser(user);
        history.pushState({ page: 'profile' }, '', `#profile`);
    };

    const handleBackClick = () => {
        setSelectedUser(null);
        history.pushState({ page: 'list' }, '', '/');
    };

    useEffect(() => {
        const handlePopState = () => {
            if (selectedUser) {
                setSelectedUser(null);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [selectedUser]);

    if (selectedUser) {
        return (
            <div className="min-h-screen bg-[#f0f2f5]">
                <div className="max-w-5xl mx-auto">
                    <div className="relative bg-white">
                        <div className="relative w-full h-[350px]">
                            <button
                                onClick={handleBackClick}
                                className="absolute left-4 top-4 px-4 py-2 bg-white rounded-md text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2 shadow-sm"
                            >
                                <span>←</span>返回
                            </button>
                            <img
                                src={selectedUser.avatar}
                                alt="cover-photo"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex items-center px-8 pb-4">
                            <div className="relative -mt-[84px]">
                                <div className="w-[168px] h-[168px] rounded-full border-4 border-white overflow-hidden">
                                    <img
                                        src={selectedUser.avatar}
                                        alt="avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 ml-4">
                                <h1 className="text-[32px] font-bold text-black">
                                    {selectedUser.first_name} {selectedUser.last_name}
                                </h1>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEmailClick(selectedUser.email)}
                                    className="px-8 py-2 bg-[#1b74e4] text-white text-[15px] font-semibold rounded-md hover:bg-[#1a6fd3]"
                                >
                                    加朋友
                                </button>
                                <button
                                    onClick={() => handleEmailClick(selectedUser.email)}
                                    className="px-8 py-2 bg-[#e4e6eb] text-[#050505] text-[15px] font-semibold rounded-md hover:bg-gray-200"
                                >
                                    發訊息
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto p-4">
                {isLoading ? (
                    <div className="text-center py-8">載入中...</div>
                ) : (
                    <>
                        <div className="hidden md:grid md:grid-cols-3 md:gap-4">
                            {users.map(user => (
                                <div
                                    key={user.id}
                                    className="bg-white rounded-lg shadow overflow-hidden"
                                >
                                    <div
                                        className="relative pb-[70%] cursor-pointer"
                                        onClick={() => handleProfileClick(user)}
                                    >
                                        <img
                                            src={user.avatar}
                                            alt={user.first_name}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-semibold text-base mb-1">
                                            {user.first_name} {user.last_name}
                                        </h3>
                                        <p className="text-xs text-gray-500 mb-3">
                                            {user.mutualFriends} 位共同朋友
                                        </p>
                                        <div className="space-y-1.5">
                                            <button
                                                onClick={() => handleEmailClick(user.email)}
                                                className="w-full py-1.5 bg-[#1b74e4] text-white text-sm font-semibold rounded"
                                            >
                                                確認
                                            </button>
                                            <button
                                                onClick={() => handleDeleteFriend(user.id)}
                                                className="w-full py-1.5 bg-[#e4e6eb] text-[#050505] text-sm font-semibold rounded"
                                            >
                                                刪除
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="md:hidden space-y-2">
                            {users.map(user => (
                                <div
                                    key={user.id}
                                    className="bg-white p-4"
                                >
                                    <div className="flex items-start">
                                        <img
                                            src={user.avatar}
                                            alt={user.first_name}
                                            className="w-[60px] h-[60px] rounded-full object-cover flex-shrink-0 cursor-pointer"
                                            onClick={() => handleProfileClick(user)}
                                        />
                                        <div className="ml-3 flex-grow">
                                            <h3 className="font-bold text-[15px]">
                                                {user.first_name} {user.last_name}
                                            </h3>
                                            <p className="text-xs text-gray-500">
                                                {user.mutualFriends} 位共同朋友
                                            </p>
                                            <div className="flex gap-2 mt-2">
                                                <button
                                                    onClick={() => handleEmailClick(user.email)}
                                                    className="flex-1 py-1.5 bg-[#1b74e4] text-white text-sm font-semibold rounded"
                                                >
                                                    確認
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteFriend(user.id)}
                                                    className="flex-1 py-1.5 bg-[#e4e6eb] text-[#050505] text-sm font-semibold rounded"
                                                >
                                                    刪除
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <div className="text-center py-5 mt-4 border-t border-gray-200">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded text-sm font-semibold ${currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-[#e4e6eb] text-[#050505] hover:bg-gray-200'
                            } mr-2`}
                    >
                        上一頁
                    </button>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded text-sm font-semibold ${currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-[#e4e6eb] text-[#050505] hover:bg-gray-200'
                            }`}
                    >
                        下一頁
                    </button>
                </div>
            </div>
        </div>
    );
};
