import React, { useEffect, useState } from 'react'
import TableBp from './TableBp'
import AxiosInterceptors from '@/apis/AxiosInterceptor'
import { ApiHeader } from '@/apis/constants'

const BackendTable = (props) => {

    const [perPageCount, setperPageCount] = useState(10)
    const [pageCount, setpageCount] = useState(1)
    const [currentPage, setcurrentPage] = useState(1)
    const [lastPage, setlastPage] = useState(1)
    const [totalCount, settotalCount] = useState(0)
    const [errorState, seterrorState] = useState(false)
    const [dataList, setdataList] = useState([])
    const [loader, setloader] = useState(false)

    const searchOldFun = async () => {
        seterrorState(false)
        setloader(true)

        let url = `${props?.api}?draw=1&start=${pageCount}&length=${perPageCount}`;

        AxiosInterceptors.get(url, ApiHeader())
            .then((res) => {
                console.log('table: ', res)
                setdataList(res?.data?.data ?? [])
                settotalCount(res?.data?.recordsTotal ?? 0)
                setlastPage(() => {
                    if (res?.data?.recordsTotal % perPageCount == 0) {
                        return Math.ceil(res?.data?.recordsTotal / perPageCount) - 1
                    } else {
                        return Math.ceil(res?.data?.recordsTotal / perPageCount)
                    }
                })
                if (typeof (props.getData) == 'function') {
                    props.getData(data?.result)
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setdataList([])
                settotalCount(0)
                seterrorState(true)
            }).
            finally(() => {
                setloader(false)
                seterrorState(false)
            })

    }

    // 👉 Function 2 👈
    const nextPageFun = () => {
        setpageCount(currentPage + 1)
        setcurrentPage(currentPage + 1)
    }

    // 👉 Function 3 👈
    const prevPageFun = () => {
        setpageCount(currentPage - 1)
        setcurrentPage(currentPage - 1)
    }

    // 👉 Function 4 👈
    const perPageFun = (val) => {

        console.log('incoming per page: ', val)

        let checkPage = parseInt(totalCount / val)
        let checkPageRemainder = parseInt(totalCount % val)

        if (checkPageRemainder == 0) {
            checkPage < currentPage && setpageCount(checkPage)
            setperPageCount(val)
            return
        }

        if (checkPageRemainder != 0) {
            (checkPage + 1) < currentPage && setpageCount(checkPage + 1)
            setperPageCount(val)
            return
        }

    }

    // 👉 Function 5 👈
    const firstPageFun = () => {
        setpageCount(1)
        setcurrentPage(1)
    }

    // 👉 Function 6 👈
    const lastPageFun = () => {
        setpageCount(lastPage)
        setcurrentPage(lastPage)
    }

    // 👉 Calling Function 1 on Data change 👈
    useEffect(() => {

        if (props?.changeData > 0) {
            setpageCount(1)
            setperPageCount(10)
            searchOldFun()
        }

    }, [props?.changeData])

    // 👉 Calling Function 1 when page no. or data per page change 👈
    useEffect(() => {
        setloader(true)
        searchOldFun()
    }, [pageCount, perPageCount, currentPage])

    return (
        <>

            {/* 👉 When error occured 👈 */}
            {errorState &&
                <div className="bg-red-100 border border-red-400 text-red-700 pl-4 pr-16 py-3 rounded relative text-center" role="alert">
                    <strong className="font-bold">Sorry! </strong>
                    <span className="block sm:inline">Some error occured while fetching list. Please try again later.</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    </span>
                </div>
            }

            {/* 👉 Listtable 👈 */}
            <TableBp
                dataList={dataList}
                columns={props?.columns}
                totalCount={totalCount}
                lastPage={lastPage}
                currentPage={currentPage}
                goFirst={firstPageFun}
                goLast={lastPageFun}
                nextPage={nextPageFun}
                prevPage={prevPageFun}
                perPageC={perPageFun}
                perPageCount={perPageCount}
                heading={props?.heading}
                loader={loader}
            />

        </>
    )
}

export default BackendTable