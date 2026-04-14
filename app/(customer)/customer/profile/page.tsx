'use client';

import { mockUserProfile, mockOrders } from '@/lib/mockData';
import { clearCart } from '@/lib/redux/slice/cartSlice';
import { useGetUserCardsQuery, useGetUserDetailQuery } from '@/store/services/customer-api';
import { User, Mail, Phone, Calendar, ShoppingBag, Crown, Edit2, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import Image from "next/image";


export default function ProfilePage() {
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
  const { data: userCards, isLoading: isUserCardsLoading } = useGetUserCardsQuery();

  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/logout", { method: "POST" })?.then(async (res) => {
      const data = await res.json() as { success: boolean };
      if (data.success) {
        dispatch(clearCart());
        const signOutRes = await signOut({ callbackUrl: "/login", redirect: false });
        console.log("Sign out response:", signOutRes);
        if (signOutRes?.url) {
          router.push("/login");
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Header */}
      <div className="mb-8">
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
              <p className="font-medium text-foreground">{isLoading ? 'Loading...' : userProfile?.email}</p>
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
      <div className="bg-card rounded-lg border border-border p-6 mb-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Membership Benefits</h3>
        <p className="text-muted-foreground mb-4">{membershipBenefit[mockUserProfile.membershipTier]}</p>
        <div className="grid md:grid-cols-3 gap-4">
          {userCards?.available_card_types?.map((tier) => {
            const isActive = false;

            return (
              <div
                key={tier.id}
                className={`p-4 rounded-xl border-2 transition-all shadow-sm hover:shadow-md
        ${isActive
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                  }`}
              >
                {/* Card Image */}
                <div className="w-full h-32 relative mb-3">
                  <Image
                    src={`${process.env.ASSET_ENDPOINS}/${tier.image}`}
                    alt={tier.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* Title */}
                <p className="font-semibold text-base capitalize">
                  {tier.name}
                </p>

                {/* Discount */}
                <p className="text-sm text-muted-foreground mt-1">
                  {tier.discount_percent
                    ? `${tier.discount_percent}% Discount`
                    : "Special Discount Available"}
                </p>

                {/* Description (HTML safe render) */}
                <div
                  className="text-xs text-muted-foreground mt-2 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: tier.description }}
                />

                {/* Active Badge */}
                {isActive && (
                  <div className="mt-3 text-xs font-medium text-primary">
                    Active Plan
                  </div>
                )}
              </div>
            );
          })}

          {userCards?.applied_cards?.map((tier) => {
            const appliedcards = tier?.card_type;
            const isActive = tier?.status === 1;
            const isPrimary = tier?.is_primary === 1;

            return (
              <div
                key={appliedcards?.id}
                className={`p-4 rounded-xl border-2 transition-all shadow-sm hover:shadow-md
        ${isPrimary
                    ? "border-green-500 bg-green-50" : isActive ? " border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
              >
                {/* Card Image */}
                <div className="w-full h-32 relative mb-3">
                  <Image
                    src={`${process.env.ASSET_ENDPOINS}/${appliedcards?.image}`}
                    alt={appliedcards?.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* Title */}
                <p className="font-semibold text-sm capitalize">
                  Card: {tier?.card_name}
                </p>

                {/* Title */}
                <p className="font-semibold text-sm capitalize">
                  Balance: {tier?.balance} <br /> Exy Date: {new Date(tier?.expiry_date).toLocaleDateString()}
                </p>

                {/* Title */}
                <p className="font-semibold text-sm capitalize">
                  Card: {tier?.card_number}
                </p>


                {/* Active Badge */}
                {isPrimary ? (
                  <div className="mt-3 text-xs font-medium text-green-500">
                    Primary
                  </div>
                ) : isActive ? (
                  <div className="mt-3 text-xs font-medium text-primary">
                    Active
                  </div>
                ) : null}
              </div>
            );
          })}

           {userCards?.leads?.map((tier) => {
            const appliedcards = tier?.card_type;
            const isActive = tier?.status;

            return (
              <div
                key={appliedcards?.id}
                className={`p-4 rounded-xl border-2 transition-all shadow-sm hover:shadow-md
        ${isActive === "approved"
                    ? "border-green-500 bg-green-50" : isActive === "pending" ? " border-yellow-500 bg-yellow-50" : "border-border hover:border-primary/50"
                  }`}
              >
                {/* Card Image */}
                <div className="w-full h-32 relative mb-3">
                  <Image
                    src={`${process.env.ASSET_ENDPOINS}/${appliedcards?.image}`}
                    alt={appliedcards?.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* Title */}
                <p className="font-semibold text-sm capitalize">
                  CRN No.: {tier?.crn}
                </p>

                {/* Title */}
                <p className="font-semibold text-sm capitalize">
                  Name: {tier?.name} <br /> Phone: {tier?.phone}
                </p>


                {/* Active Badge */}
                {isActive === "pending" ? (
                  <div className="mt-3 text-xs font-medium text-yellow-500">
                    Pending
                  </div>
                ) : isActive === "approved" ? (
                  <div className="mt-3 text-xs font-medium text-green-500">
                    Set as Primary
                  </div>
                ) : isActive === "rejected" ? (
                  <div className="mt-3 text-xs font-medium text-red-500">
                    Rejected
                  </div>
                ) : null}
              </div>
            );
          })}

        </div>
      </div>

      {/* Statistics */}
      <div className="bg-card rounded-lg border border-border p-6 mb-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Account Statistics</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <p className="text-sm text-muted-foreground">Total Orders</p>
            </div>
            <p className="text-3xl font-bold text-foreground">{mockUserProfile.totalOrders}</p>
          </div>
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-primary" />
              <p className="text-sm text-muted-foreground">Member Since</p>
            </div>
            <p className="text-lg font-semibold text-foreground">
              {new Date(mockUserProfile.joinDate).toLocaleDateString('en-US', { year: '2-digit', month: 'short' })}
            </p>
          </div>
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Crown className="w-5 h-5 text-primary" />
              <p className="text-sm text-muted-foreground">Status</p>
            </div>
            <p className="text-lg font-semibold text-foreground capitalize">{mockUserProfile.membershipTier}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
          Edit Profile
        </button>
        <button className="w-full border border-border text-foreground py-3 rounded-lg font-semibold hover:bg-muted transition-colors">
          Change Password
        </button>
        <button onClick={handleLogout} disabled={loading} className="w-full cursor-pointer flex items-center justify-center gap-2 border border-destructive text-destructive py-3 rounded-lg font-semibold hover:bg-destructive/5 transition-colors">
          <LogOut className="w-5 h-5" />
          {loading ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </div>
  );
}
