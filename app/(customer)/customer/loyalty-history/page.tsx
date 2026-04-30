'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGetLoyalityPointQuery } from '@/store/services/wallet-point-api'

export default function LoyalityPage() {
  const [timeFilter, setTimeFilter] = useState('Last 3 month')
  const [isOpen, setIsOpen] = useState(false)

  const transactions = [
    { id: 1, name: 'Order # YSLFCIPHWR', date: '09 Mar 2026', points: 150 },
    { id: 2, name: 'Order # 3HWPHDHJG', date: '04 Feb 2026', points: 81 },
    { id: 3, name: 'Burger King', date: '04 Feb 2026', points: 1000, isGray: true },
    { id: 4, name: 'Order # 7ZPYFWIEDY', date: '01 Feb 2026', points: 117 },
  ]

  const timeOptions = ['Last 3 month', 'Last 6 months', 'Last year', 'All time']
  const { data: loyaltyPoints, isLoading } = useGetLoyalityPointQuery();
  const availablePoints = loyaltyPoints?.available_points || 0;
  const pointsHistory = loyaltyPoints?.points || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with brush stroke */}
      <div className="relative bg-white w-full">
        {/* Orange brush stroke background */}
        <div className="h-32 sm:h-36 bg-gradient-to-r from-primary via-secondary to-primary relative overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1228 180" preserveAspectRatio="none">
            <path
              d="M 0,60 Q 100,30 250,50 T 600,40 T 1000,60 L 1228,0 L 1228,120 Q 1100,140 800,130 T 300,140 L 0,150 Z"
              fill="currentColor"
              className="text-orange-500"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Content container */}
        <div className="flex flex-col items-center justify-center pt-8 relative z-10 -mt-32">
          {/* Crown icon */}
          <div className="mb-6 flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-full border-4 border-yellow-300 shadow-lg">
            <svg
              className="w-12 h-12 text-yellow-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>

          {/* Points and title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{availablePoints} Coins</h1>
        </div>
      </div>

      {/* History section */}
      <div className="w-full px-6 max-h-[80dvh] no-scrollbar overflow-y-auto py-2">
        <div className="flex items-center justify-between mt-2 mb-4">
          <h2 className="text-2xl font-bold text-primary">History</h2>

          {/* Time filter dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center cursor-pointer gap-2 px-4 py-2 border-2 border-primary rounded-full font-medium text-primary hover:bg-gray-100 transition-colors"
            >
              {timeFilter}
              <ChevronDown className="w-4 h-4" />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-primary rounded-lg shadow-lg z-20">
                {timeOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setTimeFilter(option)
                      setIsOpen(false)
                    }}
                    className="w-full cursor-pointer text-left px-4 py-3 hover:bg-primary/10 first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Transaction list */}
        <div className="space-y-1">
          {
            isLoading ? "Loading..." : pointsHistory?.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between px-4 py-4 rounded-sm bg-white border-gray-200 border-2 border-dotted transition-shadow"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-base">{transaction?.order_no} || {transaction?.created_at ? new Date(transaction?.created_at).toLocaleDateString('en-US', { day: 'numeric', year: 'numeric', month: 'long' }) : "N/A"} </h3>
                  <p className="text-gray-500 text-sm">  </p>
                  <p className='text-gray-500 text-sm'>{transaction?.description}</p>
                </div>

                {/* Points badge */}
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg ml-4 ${transaction.type === 'debit'
                    ? 'bg-gray-400 text-white'
                    : 'bg-yellow-400 text-yellow-700 border-2 border-yellow-300'
                    }`}
                >
                  <span className="text-center">
                    {transaction?.points}
                  </span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
