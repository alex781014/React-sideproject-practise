import { useState } from 'react'
import ArticleForm from './components/ArticleForm'
import FaceBookFriendsList from './components/FaceBookFriendsList'

const App = () => {
  const [currentPage, setCurrentPage] = useState('article')

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center space-x-8 py-4">
            <button
              onClick={() => setCurrentPage('article')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === 'article'
                ? 'bg-blue-500 text-white'
                : 'text-gray-500 hover:text-blue-500'
                }`}
            >
              Article Form
            </button>
            <button
              onClick={() => setCurrentPage('facebook')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === 'facebook'
                ? 'bg-blue-500 text-white'
                : 'text-gray-500 hover:text-blue-500'
                }`}
            >
              FaceBook Friends List
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="transition-all duration-300 ease-in-out">
          {currentPage === 'article' ? (
            <div className="animate-fadeIn">
              <ArticleForm />
            </div>
          ) : (
            <div className="animate-fadeIn">
              <FaceBookFriendsList />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App