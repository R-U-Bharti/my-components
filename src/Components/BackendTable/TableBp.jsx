import React, { useMemo, useState, useEffect, useReducer } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { CSVLink } from "react-csv";
import * as XLSX from 'xlsx'
import jsPDF from "jspdf";
import "jspdf-autotable";
import { saveAs } from 'file-saver';
import blank from '../../assets/blankTable.png'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

const TableBp = (props) => {

    const [toggle, setToggle] = useState('')

    const columns = useMemo(() => props.columns, [props?.columns])
    const data = useMemo(() => props.dataList, [props.dataList])

    const exportStatus = props?.exportStatus ?? false;

    useEffect(() => {
        setPageSize(10)
    }, [])

    const {
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        setPageSize,
        state,
        setGlobalFilter
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 }
    }, useGlobalFilter, useSortBy, usePagination)

    const { globalFilter, pageIndex, pageSize } = state

    const handleChange = (type, value) => {
        switch (type) {
            case "pageSize": {
                setPageSize(parseInt(value))
                props.perPageC(parseInt(value))
            } break;
            default:
                return null
        }
    }

    const nextPageFun = () => {

        if (props?.lastPage != props?.currentPage) {
            props.nextPage()
        }

    }

    const prevPageFun = () => {

        if (props?.currentPage != 1) {
            props.prevPage()
        }

    }

    const generatePDF = (headers, data, text = "text", declarationContent) => {
        const doc = new jsPDF();
        doc.setFontSize(12);

        const pageWidth = doc.internal.pageSize.width;
        const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const xCoordinate = (pageWidth - textWidth) / 2;

        doc.text(text, xCoordinate, 10);

        doc.autoTable({
            head: [headers],
            body: data,
            startY: 20,
        });


        doc.save(`${text}.pdf`);
    };

    const makeExportFun = () => {

        let data = props?.allData?.map((elem, index) => {
            // Map over the columns for each element in dataList
            const rowData = props?.columns?.map((col, columnIndex) => {

                var value;

                if (col?.option && col?.option?.length > 0) {
                    // console.log('tables data column data: ', col?.option, elem[col?.accessor])

                    const matchingOption = col?.option?.find(option => option.hasOwnProperty(elem[col?.accessor]));

                    // console.log('tables data matching option ', matchingOption)

                    if (matchingOption) {
                        value = matchingOption[elem[col?.accessor]];
                    } else {
                        value = elem[col?.accessor]
                    }
                } else {
                    value = elem[col?.accessor]
                }

                // console.log('making values: ', value)

                return col?.Header.toLowerCase() != "action" && { [col?.Header]: col?.accessor ? value : index + 1 };
            });

            // console.log('appending row data: ', rowData)

            // Combine rowData for each element into a single object
            return Object.assign({}, ...rowData);
        });

        return data;
    };

    const exportToExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        saveAs(blob, props?.heading ? `${props?.heading}.xlsx` : 'DataList.xlsx');
    }

    const exportToPdf = () => {
        const headers = props?.columns?.filter(item => item?.Header.toLowerCase() != "action")?.map((elem) => elem?.Header)
        const data = props?.allData?.map(elem => {
            return props?.columns?.filter(item => item?.Header.toLowerCase() != "action")?.map((col) => {
                // return ad[elem?.accessor];

                var value;

                if (col?.option && col?.option?.length > 0) {
                    // console.log('tables data column data: ', col?.option, elem[col?.accessor])

                    const matchingOption = col?.option?.find(option => option.hasOwnProperty(elem[col?.accessor]));

                    // console.log('tables data matching option ', matchingOption)

                    if (matchingOption) {
                        value = matchingOption[elem[col?.accessor]];
                    } else {
                        value = elem[col?.accessor]
                    }
                } else {
                    value = elem[col?.accessor]
                }

                return value;
            })
        });

        generatePDF(headers, data, props?.heading || 'Data List');
    }

    useEffect(() => {

        if (props?.exportType === 'csv') {
            makeExportFun()
        }
        if (props?.exportType === 'pdf') {
            exportToPdf()
        }
        if (props?.exportType === 'excel') {
            exportToExcel(makeExportFun())
        }

    }, [props?.allData])

    const actionButtonStyle = 'border border-zinc-300 text-xs w-max px-3 py-1 text-zinc-700 hover:bg-zinc-100 cursor-pointer focus:outline-none select-none'
    const buttonStyle = 'border border-zinc-300 hover:bg-white text-xs w-max px-3 py-1 text-zinc-700 hover:bg-zinc-100 cursor-pointer focus:outline-none select-none'

    const toggleData = (key) => {
        if (key === toggle) {
            setToggle('')
        } else {
            setToggle(key)
        }
    }

    return (
        <>
            <div className="w-full text-zinc-600 text-sm py-3 flex md:flex-row flex-col gap-y-2 md:justify-between md:items-center">
                {
                    Array.isArray(props?.dataList) && props?.dataList?.length > 0 &&
                    <>
                        <div className='w-full md:w-[30%] flex items-center gap-2'>
                            <span>Search: </span>
                            <input className='fieldStyle w-full' type="text" value={globalFilter || ''} onChange={e => setGlobalFilter(e.target.value)} />
                        </div>
                        <div className='flex gap-5 md:justify-start justify-between'>
                            {exportStatus &&
                                <>
                                    {
                                        props?.exportLoader == true ? <div className='italic text-sm text-center'>Exporting...</div>
                                            :
                                            <div className="flex gap-2 items-center">
                                                <button className={actionButtonStyle} onClick={() => props.exportFun('csv')}>
                                                    <CSVLink className='' data={props?.allData ?? []}>CSV</CSVLink>
                                                </button>
                                                <button className={actionButtonStyle} onClick={() => props.exportFun('excel')}>Excel</button>
                                                <button className={actionButtonStyle} onClick={() => props.exportFun('pdf')}>PDF</button>
                                            </div>
                                    }
                                </>}
                            <div className='text-xs flex items-center gap-1'>
                                Show <select className="fieldStyle" value={pageSize} onChange={(e) => handleChange('pageSize', e.target?.value)}>
                                    {[5, 10, 25, 50].map((pageSize) => (
                                        <option key={pageSize} value={pageSize}>
                                            {pageSize}
                                        </option>
                                    ))}
                                </select> entries
                            </div>
                        </div>
                    </>
                }
            </div>

            <div className="w-full">

                <div className="md:block hidden w-full overflow-auto">
                    <table {...getTableBodyProps()} className="w-full" style={{ overflowX: 'auto' }}>
                        <thead className='bg-slate-50 border-b' style={{ width: '100%' }}>
                            {
                                headerGroups?.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()} style={{ width: '100%' }}>
                                        {
                                            headerGroup.headers.map((column) => {
                                                return !column.more && <th className='w-full text-zinc-700 font-semibold text-sm text-start p-2' {...column.getHeaderProps(column.getSortByToggleProps())} style={{ width: column?.render('width') ? column?.render('width') : 'auto', cursor: 'pointer' }} >
                                                    <div className='flex items-center justify-between'>
                                                        {column.render('Header')}
                                                        <div className='text-xs flex flex-col items-end pr-2'>
                                                            <span className={column.isSorted && column.isSortedDesc ? 'text-blue-500' : 'text-slate-200'}><FaCaretUp /></span>
                                                            <span className={column.isSorted && !column.isSortedDesc ? 'text-blue-500' : 'text-slate-200'}><FaCaretDown /></span>
                                                        </div>
                                                    </div>
                                                </th>
                                            })
                                        }
                                    </tr>
                                ))
                            }

                        </thead>
                        <tbody {...getTableBodyProps()} className="">
                            {!props?.loader ? <>{
                                Array.isArray(props?.dataList) && props?.dataList?.length > 0 ?
                                    <>
                                        {page?.map((row) => {
                                            prepareRow(row)
                                            return <>
                                                <tr {...row.getRowProps()} className="">
                                                    {row?.cells?.map((cell, index) => {
                                                        return !cell.render("Cell").props.column.more && <td {...cell.getCellProps()} className="py-2 px-1.5 border-b bg-white text-zinc-600 text-sm">
                                                            <div className='flex items-center gap-1'>
                                                                {(props?.more && index === 0) && <span className='text-zinc-800 cursor-pointer select-none px-1 border hover:bg-slate-50' onClick={() => toggleData(row?.id)}>+</span>}
                                                                {cell.render('Cell')}
                                                            </div>
                                                        </td>
                                                    })}
                                                </tr>
                                                {toggle === row?.id && <tr {...row.getRowProps()} className="w-full">
                                                    <td colSpan={props.columns.filter(item => !item.more).length} className='bg-slate-50 border-b p-2 text-sm '>
                                                        {row?.cells?.map((mor) => {
                                                            return mor.render("Cell").props.column.more == true && <>
                                                                <div className=' w-full grid grid-cols-12 py-1'>
                                                                    <div className='col-span-2 font-semibold'>{mor.render("Cell").props.column?.Header}:</div>
                                                                    <div className='col-span-10 font-normal'>{mor.render('Cell')}</div>
                                                                </div>
                                                            </>
                                                        })}
                                                    </td>
                                                </tr>}
                                            </>
                                        })}
                                    </>

                                    :
                                    <tr className="bg-white">
                                        <td className='border bg-white w-full text-sm text-zinc-600' colSpan={props?.columns?.length}>
                                            <div className="bg-white flex flex-col items-center justify-center py-2">
                                                <img src={blank} alt="" />
                                                <div className="blank_text">No Data Available</div>
                                            </div>
                                        </td>
                                    </tr>
                            }</> :
                                <>
                                    <tr className="bg-white">
                                        <td className='border bg-gray-200 w-full text-sm text-zinc-600' colSpan={props?.columns?.length}>
                                            <div className="w-full flex flex-col gap-2 p-2">
                                                <div className='animate w-full h-9 border' />
                                                <div className='animate w-full h-9 border' />
                                                <div className='animate w-full h-9 border' />
                                                <div className='animate w-full h-9 border' />
                                                <div className='animate w-full h-9 border' />
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            }
                        </tbody>
                    </table>
                </div>

                {!props?.loader ? <>{
                    Array.isArray(props?.dataList) && props?.dataList?.length > 0 ?
                        <>
                            <div className='md:hidden flex flex-col gap-4'>
                                {
                                    page?.map((row, index) => {
                                        return (
                                            <div key={index} className="border p-2 shadow-[0px_0px_10px_rgba(0,0,0,0.1)] bg-white flex flex-col gap-2 text-sm">
                                                {props?.columns?.map((column, index) => <div key={index} className="flex gap-2">
                                                    <span className="font-semibold">{column?.Header}: </span>
                                                    <div className="font-normal">
                                                        {row?.cells[index].render('Cell')}
                                                    </div>
                                                </div>
                                                )}
                                            </div>
                                        )
                                    }
                                    )
                                }
                            </div>
                        </>
                        :
                        <>
                            <div className="md:hidden bg-white flex flex-col items-center justify-center py-2 text-zinc-600 border shadow-[0px_0px_10px_rgba(0,0,0,0.1)] text-sm">
                                <img src={blank} alt="" />
                                <div className="blank_text">No Data Available</div>
                            </div>
                        </>
                }</> :
                    <div className="md:hidden bg-gray-200 flex flex-col gap-2 items-center justify-center p-2 text-zinc-600 text-sm">
                        <div className='animate w-full h-[180px] border-2' />
                        <div className='animate w-full h-[180px] border-2' />
                        <div className='animate w-full h-[180px] border-2' />
                    </div>
                }

                {Array.isArray(props?.dataList) && props?.dataList?.length > 0 &&
                    <>
                        <div className='py-2 w-full flex justify-between'>
                            <div className='text-xs text-zinc-500'>
                                Showing page {props?.currentPage} of {props?.lastPage}
                            </div>

                            <div className='flex gap-2 items-center'>
                                <button className={buttonStyle} onClick={() => props?.goFirst()} disabled={props?.currentPage == 1 && true}>First</button>
                                <button style={{ opacity: props?.currentPage == 1 ? '.5' : '1' }} className={buttonStyle} onClick={() => prevPageFun()} disabled={props?.currentPage == 1 && true}>Previous</button>
                                <button style={{ opacity: props?.currentPage == props?.lastPage ? '.5' : '1' }} className={buttonStyle} onClick={() => nextPageFun()} disabled={props?.currentPage == props?.lastPage && true}>Next</button>
                                <button className={buttonStyle} onClick={() => props?.goLast()} disabled={props?.currentPage == props?.lastPage && true}>Last</button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default TableBp