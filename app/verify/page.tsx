import VerifyModel from '@/components/dialog/VerifyModel'
import React from 'react'

const page = ({ searchParams }: { searchParams: { activationCode: string } }) => {
    return (
        <div>
            <VerifyModel token={searchParams?.activationCode || ""} />
        </div>
    )
}

export default page
