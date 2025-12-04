"use client";

export default function Pagination({ page, setPage, totalPages }) {
  const prev = () => setPage(Math.max(1, page - 1));
  const next = () => setPage(Math.min(totalPages, page + 1));

  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        onClick={prev}
        disabled={page === 1}
        className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Prev
      </button>
      <span className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700">
        {page} / {totalPages}
      </span>
      <button
        onClick={next}
        disabled={page === totalPages}
        className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
