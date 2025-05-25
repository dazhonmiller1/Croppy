'use client'

export function CropIcon({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-crop"
      >
        <path d="M6.13 1 6 16a2 2 0 0 0 2 2h15" />
        <path d="M1 6.13 16 6a2 2 0 0 1 2 2v15" />
      </svg>

      {/* Smiley face in the middle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-3.5 w-3.5 rounded-full bg-white flex items-center justify-center">
          <div className="h-3 w-3 rounded-full flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="flex space-x-1">
                <div className="h-0.5 w-0.5 rounded-full bg-current"></div>
                <div className="h-0.5 w-0.5 rounded-full bg-current"></div>
              </div>
              <div className="h-[1px] w-1.5 mt-[1px] border-b border-current rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

