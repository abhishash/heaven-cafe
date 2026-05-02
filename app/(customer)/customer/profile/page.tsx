'use client';

import { mockUserProfile, mockOrders } from '@/lib/mockData';
import { clearCart } from '@/lib/redux/slice/cartSlice';
import { useGetUserCardsQuery, useGetUserDetailQuery, useSetPrimaryCardMutation, useApplyCardMutation } from '@/store/services/customer-api';
import { User, Mail, Phone, Calendar, ShoppingBag, Crown, Edit2, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import CardSkeleton from '@/components/customer/placeholder/CardSkeleton';
import CreditCard from '@/components/shared/credit-card';
import { formatExpiry } from '@/lib/utils';
import { motion } from "framer-motion";
import { useRef } from "react";


export default function ProfilePage() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);


  const membershipColor = {
    bronze: 'bg-orange-100 text-orange-800',
    silver: 'bg-gray-100 text-gray-800',
    gold: 'bg-yellow-100 text-yellow-800',
  };

  const membershipBenefit = {
    bronze: 'Get basic discounts and exclusive offers',
    silver: 'Enjoy 5% off and free delivery on orders over $20',
    gold: 'Get 10% off all orders, free delivery, and exclusive specials',
  };

  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { data: userProfile, isLoading } = useGetUserDetailQuery();
  const { data: userCards, isLoading: isUserCardsLoading, refetch } = useGetUserCardsQuery();
  const [setPrimaryCard, { isLoading: isSetPrimaryCardLoading }] = useSetPrimaryCardMutation();
  const [applyCard, { isLoading: isApplyCardLoading }] = useApplyCardMutation();

  useEffect(() => {
    const calculateWidth = () => {
      if (sliderRef.current && containerRef.current) {
        const scrollWidth = sliderRef.current.scrollWidth;
        const offsetWidth = containerRef.current.offsetWidth;
        setWidth(scrollWidth - offsetWidth);
      }
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);

    return () => window.removeEventListener("resize", calculateWidth);
  }, [userCards]);

  const handleApplyCard = async (id: number) => {
    try {
      await applyCard({ card_type_id: id }).unwrap();
      toast.success("Card applied successfully");
      refetch();
    } catch (err) {
      toast.error("Failed to apply card");
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/logout", { method: "POST" })?.then(async (res) => {
      const data = await res.json() as { success: boolean };
      if (data.success) {
        dispatch(clearCart());
        const signOutRes = await signOut({ callbackUrl: "/login", redirect: false });
        if (signOutRes?.url) {
          router.push("/");
        } else {
          toast.warning("Logout successful, but failed to redirect. Please login again.");
        }
      }
    }).catch((error) => {
      toast.warning("Error logging out:", error);
    }).finally(() => {
      setLoading(false);
    })
  }

  return (
    <div className="px-4 mt-10 mb-10 sm:my-0">
      {/* Header */}
      <div className="mb-4 sm:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-border p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground flex-shrink-0">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{isLoading ? 'Loading...' : userProfile?.name}</h2>
              <p className="text-muted-foreground">Member since {isLoading ? 'Loading...' : userProfile?.created_at ? new Date(userProfile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'N/A'}</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${membershipColor[mockUserProfile.membershipTier]}`}>
            <Crown className="w-5 h-5" />
            <span className="font-semibold capitalize">{mockUserProfile.membershipTier} Member</span>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-card rounded-lg border border-border p-6 mb-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Contact Information</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="font-medium break-all text-foreground">{isLoading ? 'Loading...' : userProfile?.email}</p>
            </div>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Edit2 className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
              <p className="font-medium text-foreground">{isLoading ? 'Loading...' : userProfile?.phone}</p>
            </div>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Edit2 className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Membership Section */}
      <div className="bg-card rounded-lg border border-border p-3 sm:p-6 mb-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Membership Benefits</h3>
        <p className="text-muted-foreground mb-4">{membershipBenefit[mockUserProfile.membershipTier]}</p>
        {isUserCardsLoading ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div> : <div ref={containerRef} className="overflow-hidden max-w-[315px] sm:max-w-[720px]">
          <motion.div
            ref={sliderRef}
            drag="x"
            className="flex gap-1 sm:gap-4 cursor-grab active:cursor-grabbing"
            dragConstraints={{ left: -width, right: 0 }}
            dragElastic={0.08}
            dragTransition={{ bounceStiffness: 200, bounceDamping: 25 }}
          >
            {userCards?.available_card_types?.map((tier) => {

              return (
                <>
                  <motion.div
                    key={tier.id}
                    className="min-w-[260px] shrink-0"
                    whileTap={{ scale: 0.95 }}
                  >



                    <CreditCard cartName={tier?.name} status={""} actionButton={<button
                      onClick={() => handleApplyCard(tier.id)}
                      disabled={isApplyCardLoading}
                      className="mt-3 text-xs bg-primary text-white font-medium px-2 py-1 rounded-md cursor-pointer absolute bottom-1/2 right-0"
                    >
                      {isApplyCardLoading ? 'Applying...' : 'Apply Card'}
                    </button>} cardNumber={"XXXX XXXX XXXX XXXX"} holderName={tier?.name} expiry={formatExpiry(tier?.created_at)} />
                  </motion.div>
                </>
              );
            })}

            {userCards?.applied_cards?.map((tier) => {
              const appliedcards = tier?.card_type;
              const isActive = tier?.status === 1;
              const isPrimary = tier?.is_primary === 1;

              const statusBadge = (() => {
                if (isPrimary) {
                  return (
                    <span className=" bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                      Primary
                    </span>
                  );
                }

                if (isActive) {
                  return (
                    <span className=" bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                      Active
                    </span>
                  );
                }

                return null;
              })();

              const actionButton = (() => {
                if (!isPrimary && isActive) {
                  return (
                    <button
                      disabled={isSetPrimaryCardLoading}
                      onClick={async () => {
                        try {
                          await setPrimaryCard(tier?.id?.toString());
                          refetch();
                          toast.success("Primary card updated!");
                        } catch {
                          toast.error("Failed to update");
                        }
                      }}
                      className="w-full py-2 absolute bottom-1 rounded-md cursor-pointer text-xs font-semibold bg-orange-500/20 text-white transition disabled:opacity-50"
                    >
                      {isSetPrimaryCardLoading ? "Setting..." : "Set as Primary"}
                    </button>
                  );
                }

                return null;
              })();

              return (
                <motion.div
                  key={tier.id}
                  className="min-w-[260px] shrink-0"
                  whileTap={{ scale: 0.95 }}
                >

                  <CreditCard cartName={appliedcards?.name} balance={tier?.balance} actionButton={actionButton} status={statusBadge} cardNumber={tier?.card_number} holderName={tier?.name} expiry={formatExpiry(tier?.expiry_date)} />
                </motion.div>
              );
            })}

            {userCards?.leads?.map((tier) => {
              const appliedcards = tier?.card_type;
              const isActive = tier?.status;
              const status = (() => {
                switch (isActive) {
                  case "pending":
                    return (
                      <div className="mt-2 text-[10px] bg-yellow-100 text-yellow-600 py-0.5 px-2 rounded-xl">
                        {tier?.status}
                      </div>
                    );

                  case "approved":
                    return (
                      <div className="mt-2 text-[10px] font-medium bg-green-100 text-green-600 py-0.5 px-2 rounded-xl">
                        Approved
                      </div>
                    );

                  case "rejected":
                    return (
                      <div className="mt-2 text-[10px] font-medium bg-red-100 text-red-500 py-0.5 px-2 rounded-xl">
                        Rejected
                      </div>
                    );

                  case "processing":
                    return (
                      <div className="mt-2 text-[10px] font-medium bg-yellow-100 text-yellow-600 py-0.5 px-2 rounded-xl">
                        Processing
                      </div>
                    );

                  default:
                    return null;
                }
              })();


              return (
                <motion.div
                  key={tier.id}
                  className="min-w-[260px] shrink-0"
                  whileTap={{ scale: 0.95 }}
                >

                  <CreditCard cartName={appliedcards?.name} status={status} cardNumber={tier?.crn} holderName={tier?.name} expiry={formatExpiry(tier?.created_at)} />
                </motion.div>
              );
            })}
          </motion.div>
        </div>}

      </div>


      {/* Actions */}
      <div className="space-y-3">
        <div className='flex gap-x-4'>
          <button className="w-full cursor-pointer bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Edit Profile
          </button>
          <button className="w-full cursor-pointer border border-border text-foreground py-3 rounded-lg font-semibold hover:bg-muted transition-colors">
            Change Password
          </button>
        </div>
        <button onClick={handleLogout} disabled={loading} className="w-full cursor-pointer flex items-center justify-center gap-2 border border-destructive text-destructive py-3 rounded-lg font-semibold hover:bg-destructive/5 transition-colors">
          <LogOut className="w-5 h-5" />
          {loading ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </div>
  );
}
