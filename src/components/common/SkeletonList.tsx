import React from "react"

const SkeletonList = ({
    listNumber,
    children,
    innerRef
}: { listNumber: number, children: React.ReactNode, innerRef?: React.Ref<HTMLDivElement> }) => {
    return (
        <>
            {
                Array(listNumber)
                    .fill(1)
                    .map((_, index) => (

                        index === listNumber - 1 ?
                            (
                                <div ref={innerRef} >
                                    {children}
                                </div>
                            ) : (<div>
                                {children}
                            </div>
                            )
                    ))
            }
        </>
    )
}

export default SkeletonList