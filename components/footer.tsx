"use client";

import { Instagram, Twitter, Facebook, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchHandler, methods } from "@/lib/fetch-handler";
import { CMS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { CmsResponse } from "@/lib/types";
import { isObject } from "@/lib/type-guards";
import CmsSkeleton from "./placeholder/cms";
import Image from "next/image";

export function Footer() {

  const { data, isPending } = useQuery<CmsResponse>({
    queryKey: [`cms-page`],
    queryFn: () =>
      fetchHandler({
        ...(CMS as {
          endpoint: string;
          method: methods;
        }),
      }),
  });

  return (
    <>
      <footer className="bg-primary space-y-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-10">
            {/* Logo + Social */}
            <div className="flex justify-center flex-col items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="text-primary-foreground font-bold text-2xl">
                  <Image src="/logo/final-logo.png" className='' alt='main-logo' width={160} height={120} />
                </div>
              </Link>

              <div className="flex gap-4 my-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-secondary hover:text-gray-900"
                >
                  <Instagram className="size-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-secondary hover:text-gray-900"
                >
                  <Twitter className="size-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-secondary hover:text-gray-900"
                >
                  <Facebook className="size-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-secondary hover:text-gray-900"
                >
                  <Linkedin className="size-6" />
                </Button>
              </div>

              <div className="text-xs text-secondary space-y-1">
                <p>© The Heaven Fast Food Limited</p>
                <p>FSSAI lic no : XXXXXXXXXX</p>
              </div>
            </div>

            <div className="flex justify-evenly col-span-2">
              {isPending ? <CmsSkeleton /> :
                isObject(data?.data) ? (
                  Object.entries(data.data).map(([category, pages]) => (
                    <div key={category}>
                      <h3 className="font-semibold text-secondary mb-4">
                        {category}
                      </h3>

                      <ul className="space-y-2">
                        {pages.map((page) => (
                          <li key={page.id}>
                            <Link
                              href={`/${page.url}`}
                              className="text-sm text-secondary hover:text-green-600 transition"
                            >
                              {page.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : null
              }

            </div>

            {/* App Download */}
            <div>
              <h3 className="font-semibold text-primary mb-4">Download App</h3>

              <div className="flex flex-row sm:flex-col gap-3">
                <Button className="justify-start w-fit cursor-pointer gap-2 text-xs sm:text-sm border border-secondary text-primary bg-secondary hover:bg-green-100">
                  <svg className="size-5 fill-primary" viewBox="0 0 640 640">
                    <path d="M389.6 298.3L168.9 77L449.7 238.2L389.6 298.3zM111.3 64C98.3 70.8 89.6 83.2 89.6 99.3L89.6 540.6C89.6 556.7 98.3 569.1 111.3 575.9L367.9 319.9L111.3 64zM536.5 289.6L477.6 255.5L411.9 320L477.6 384.5L537.7 350.4C555.7 336.1 555.7 303.9 536.5 289.6zM168.9 563L449.7 401.8L389.6 341.7L168.9 563z" />
                  </svg>
                  Get it on Play Store
                </Button>

                <Button className="justify-start gap-2 cursor-pointer w-fit text-xs sm:text-sm border border-secondary text-primary bg-secondary hover:bg-green-100">
                  <svg className="size-6 fill-primary" viewBox="0 0 640 640">
                    <path d="M447.1 332.7C446.9 296 463.5 268.3 497.1 247.9C478.3 221 449.9 206.2 412.4 203.3C376.9 200.5 338.1 224 323.9 224C308.9 224 274.5 204.3 247.5 204.3C191.7 205.2 132.4 248.8 132.4 337.5C132.4 363.7 137.2 390.8 146.8 418.7C159.6 455.4 205.8 545.4 254 543.9C279.2 543.3 297 526 329.8 526C361.6 526 378.1 543.9 406.2 543.9C454.8 543.2 496.6 461.4 508.8 424.6C443.6 393.9 447.1 334.6 447.1 332.7z" />
                  </svg>
                  Get it on App Store
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
