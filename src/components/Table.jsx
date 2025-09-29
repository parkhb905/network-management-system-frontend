import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

export default function Table({ data, totalPages, totalElements, columns, page, onPageChange }) {
    const table = useReactTable({
        columns,
        data,
        pageCount: totalPages,
        state: {
            pagination: {
                pageIndex: page - 1,
                pageSize: 10,
            },
        },
        manualPagination: true, // 서버사이드 페이징 모드
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="p-2">
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="px-4 py-2 text-left">
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-4 py-2">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="text-center text-gray-500 py-6">
                                데이터가 없습니다.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* 페이징 UI */}
            <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-600">
                    Page {page} of {totalPages} (총 {totalElements} 건)
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => onPageChange(1)} disabled={page === 1}>
                        {'<<'}
                    </button>
                    <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
                        {'<'}
                    </button>
                    <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
                        {'>'}
                    </button>
                    <button onClick={() => onPageChange(totalPages)} disabled={page === totalPages}>
                        {'>>'}
                    </button>
                </div>
            </div>
        </div>
    );
}
