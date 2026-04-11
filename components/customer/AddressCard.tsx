'use client';

import { Address } from '@/lib/mockData';
import { UserAddress } from '@/lib/types';
import { MapPin, Check, Edit2, Trash2 } from 'lucide-react';

interface AddressCardProps {
  address: UserAddress;
  isEditable?: boolean;
  onEdit?: (address: UserAddress) => void;
  onDelete?: (id: number) => void;
}

export function AddressCard({ address, isEditable = true, onEdit, onDelete }: AddressCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{address.person}</p>
            <p className="text-xs text-muted-foreground capitalize">{address.contact}</p>
          </div>
        </div>
        {parseInt(address.is_default) ? (
          <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full">
            <Check className="w-4 h-4" />
            <span className="text-xs font-medium">Default</span>
          </div>
        ) : null}
      </div>

      <div className="mb-4 ml-12">
        <p className="text-sm text-foreground mb-1">{address.landmark}</p>
        <p className="text-sm text-muted-foreground">{address.address}, {address.state} {address.pincode}</p>
        <p className="text-sm text-muted-foreground mt-2">{address.country}</p>
      </div>

      {isEditable && (
        <div className="flex gap-2 ml-12">
          {onEdit && (
            <button
              onClick={() => onEdit(address)}
              className="flex items-center gap-2 text-sm font-medium text-primary hover:bg-primary/5 px-3 py-2 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(address.id)}
              className="flex items-center gap-2 text-sm font-medium text-destructive hover:bg-destructive/5 px-3 py-2 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
