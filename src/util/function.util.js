import { differenceInSeconds } from "date-fns"

export const timeFormat = (list) => {
  const diffSeconds = differenceInSeconds(new Date(+list?.leave?.datetime), new Date(+list?.datetime))
  const hours = Math.floor(diffSeconds / (60 * 60))
  const hourRest = diffSeconds % (60 * 60)
  const minuites = Math.floor(hourRest / 60)
  const minuiteRest = hourRest % 60
  const seconds = minuiteRest
  list.totalSeconds = diffSeconds
  list.diffFormat = `${hours} 시간 ${minuites} 분 ${seconds} 초`
}

const pagenation = (page, limit, totalPages) => {
  const pageNum = []
  let a = Math.floor(page / limit)
  let start = a * limit + 1
  let end = start + limit - 1
  end = end > totalPages ? totalPages : end
  for (let i = start; i < end + 1; i++) {
    pageNum.push(i)
  }
  // setPageArray(pageNum)
}

export const getData = async (page, getFunction, setSearchParams, setState, setPaginateOption, paginateOption) => {
  const paginationMeta = { page: page ?? 1, limit: 10 }
  const result = await getFunction(paginationMeta)
  const { docs, ...option } = result.data;
  setSearchParams(paginationMeta, { replace: true })
  setState(docs)
  setPaginateOption(option)
  pagenation(option.page, option.limit, option.totalPages)
}