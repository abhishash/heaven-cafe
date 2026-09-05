const WelcomeBanner = () => {
    return (
        <section className="mb-6 rounded-xl bg-secondary px-6 py-5 shadow-sm ring-1 ring-orange-100">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-wider text-orange-500">
                        Welcome to Heaven Cafe
                    </p>

                    <h1 className="text-2xl font-extrabold text-slate-800">
                        Delicious Food, Made Fresh
                    </h1>

                    <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                        Explore our delicious selection of freshly prepared meals,
                        snacks, noodles, beverages, sweets, and more. Pick your
                        favorite and enjoy the taste of Heaven Cafe.
                    </p>
                </div>

                <div className="hidden shrink-0 rounded-2xl bg-orange-50 px-5 py-3 text-center sm:block">
                    <p className="text-xs font-medium text-slate-500">
                        Freshly Prepared
                    </p>
                    <p className="text-sm font-bold text-orange-600">
                        With Love ❤️
                    </p>
                </div>
            </div>
        </section>
    )
}

export default WelcomeBanner