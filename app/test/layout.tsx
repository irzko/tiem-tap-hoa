"use client";

export default function Layout({ children }: { children: React.ReactNode }) {
  console.log("layout");
  
  return (
    <>
      <main>
        <div className="p-4 sm:ml-64">
          <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
