'use client'

import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

interface CardItemProps {
    id: number
    card_number: string
    card_name: string
    balance: string
    status: number
    is_primary: number
    expiry_date: string

    // NEW
    onClick?: () => void
    isSelected?: boolean
}

export default function CardItem({
    card_number,
    card_name,
    balance,
    status,
    is_primary,
    expiry_date,
    onClick,
    isSelected,
}: CardItemProps) {

    const maskedCardNumber = card_number
        ? `•••• •••• •••• ${card_number.slice(-4)}`
        : '•••• •••• •••• XXXX'

    const formattedExpiry = expiry_date
        ? `${expiry_date.split('-')[1]}/${expiry_date.slice(2, 4)}`
        : '--/--'

    const getCardGradient = (name: string) => {
        if (name?.includes('Gold')) return 'from-amber-400 to-amber-600'
        return 'from-slate-300 to-slate-500'
    }

    return (
        <div
            onClick={onClick}
            className={`group relative cursor-pointer rounded-2xl transition-all duration-300
        ${isSelected
                    ? 'ring-2 ring-primary scale-105 shadow-2xl'
                    : 'hover:scale-105 hover:shadow-xl'
                }
      `}
        >
            {/* Selected Icon */}
            {isSelected && (
                <div className="absolute top-4 right-4 bg-white text-primary rounded-full p-1 z-20">
                    <Check className="w-4 h-4" />
                </div>
            )}

            {/* Card */}
            <div
                className={`bg-gradient-to-br ${getCardGradient(card_name)} rounded-2xl p-4 xl:p-8 text-white shadow-lg min-h-48 flex flex-col justify-between relative overflow-hidden`}
            >
                {/* Background */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
                </div>

                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-12">
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold opacity-90 mb-1">
                                {card_name}
                            </h3>

                            {is_primary === 1 && (
                                <Badge className="bg-white text-amber-600 text-xs font-semibold">
                                    <Check className="w-3 h-3 mr-1" />
                                    Primary
                                </Badge>
                            )}
                        </div>

                        <div className="text-right">
                            <p className="text-xs opacity-75">BALANCE</p>
                            <p className="text-2xl font-bold">${balance}</p>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs opacity-75 tracking-widest mb-1">
                                CARD NUMBER
                            </p>
                            <p className="text-lg font-mono tracking-wider">
                                {maskedCardNumber}
                            </p>
                        </div>

                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-xs opacity-75 mb-1">EXPIRES</p>
                                <p className="text-lg font-mono">{formattedExpiry}</p>
                            </div>

                            <div
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${status === 1
                                    ? 'bg-white/20'
                                    : 'bg-red-500/30 text-red-100'
                                    }`}
                            >
                                {status === 1 ? 'Active' : 'Inactive'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}