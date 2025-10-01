import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

export default function Table({
    data,
    totalPages,
    totalElements,
    columns,
    page,
    pageSize,
    onPageChange,
    onPageSizeChange,
    rowSelection,
    onRowSelectionChange,
    idKey,
}) {
    const table = useReactTable({
        columns,
        data,
        pageCount: totalPages,
        state: {
            rowSelection,
            pagination: {
                pageIndex: page - 1,
                pageSize: pageSize,
            },
        },
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
        enableRowSelection: true, // row 선택 기능 활성화
        onRowSelectionChange,
        getRowId: (row) => row[idKey], // 고유 키 지정
    });

    const groupIdx = Math.floor((page - 1) / pageSize);
    const startPage = groupIdx * pageSize + 1;
    const endPage = Math.min(startPage + pageSize - 1, totalPages);

    return (
        <div className="p-2">
            <div className="max-h-[680px] overflow-y-auto border rounded">
                <table className="w-full">
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
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="text-center text-gray-500 py-6"
                                >
                                    데이터가 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* 페이징 */}
            <div className="relative flex items-center mt-4 w-full">
                {/* 전체 건수 정보 */}
                <div className="text-sm text-gray-600">
                    Page {page} of {totalPages} (총 {totalElements} 건)
                </div>

                {/* 페이지네이션 */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                    <button type="button" onClick={() => onPageChange(1)} disabled={page === 1}>
                        {'<<'}
                    </button>
                    <button
                        type="button"
                        onClick={() => onPageChange(page - 1)}
                        disabled={page === 1}
                    >
                        {'<'}
                    </button>

                    {Array.from({ length: endPage - startPage + 1 }, (_, idx) => {
                        const pageNumber = startPage + idx;
                        return (
                            <button
                                key={pageNumber}
                                type="button"
                                className={
                                    page === pageNumber
                                        ? 'text-indigo-600 font-bold underline underline-offset-4'
                                        : 'text-gray-500 hover:text-indigo-500'
                                }
                                onClick={() => onPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}

                    <button
                        type="button"
                        onClick={() => onPageChange(page + 1)}
                        disabled={page === totalPages}
                    >
                        {'>'}
                    </button>
                    <button
                        type="button"
                        onClick={() => onPageChange(totalPages)}
                        disabled={page === totalPages}
                    >
                        {'>>'}
                    </button>
                </div>

                {/* pageSize 조절 */}
                <div className="ml-auto flex items-center space-x-2">
                    <select
                        className="border rounded px-2 py-1 text-sm"
                        value={pageSize}
                        onChange={(e) => onPageSizeChange(Number(e.target.value))}
                    >
                        {[5, 10, 20, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}개씩 보기
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
