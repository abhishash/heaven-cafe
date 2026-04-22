'use client'

import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CardItem from "../shared/cart-item";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PaymentCard } from "@/types/order";

type CardType = PaymentCard;

type CardsListProps = {
    cards: CardType[];
    onAddCard?: () => void;
    orderId: string;
    amount: number;
    onSubmit: (details: any) => Promise<void>;
    isLoading?: boolean;
};

const CardsList = ({
    cards,
    onAddCard,
    orderId,
    amount,
    onSubmit,
    isLoading = false,
}: CardsListProps) => {

    const [selectedCardId, setSelectedCardId] = useState<string | number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ✅ Auto select primary card
    useEffect(() => {
        const primary = cards.find((c) => c.is_primary === 1);
        if (primary) setSelectedCardId(primary.card_number);
    }, [cards]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedCardId) {
            toast.error("Please select a card");
            return;
        }

        setIsSubmitting(true);

        try {
            await onSubmit({
                card_number: selectedCardId,
            });
        } catch (error) {
            toast.error("Error placing order");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            <div className="bg-gradient-to-br from-background via-background to-slate-50">
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="space-y-8">

                        <div>
                            <h2 className="text-xl font-semibold text-foreground mb-6">
                                Your Cards
                            </h2>

                            {cards.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {cards.map((card) => (
                                        <CardItem
                                            key={card.id}
                                            {...card}
                                            isSelected={selectedCardId === card.card_number}
                                            onClick={() => setSelectedCardId(card.card_number)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground mb-4">
                                        No cards yet
                                    </p>

                                    <Button
                                        type="button"
                                        onClick={onAddCard}
                                        className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Your First Card
                                    </Button>
                                </div>
                            )}
                        </div>

                    </div>
                </main>
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                size="lg"
                disabled={isSubmitting || isLoading}
                className="w-full bg-primary text-primary-foreground hover:opacity-90 font-semibold"
            >
                {isSubmitting || isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Placing Order...
                    </>
                ) : (
                    'Place Order'
                )}
            </Button>
        </form>
    );
};

export default CardsList;
