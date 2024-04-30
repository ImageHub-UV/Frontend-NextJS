"use client";

import {Suspense, useEffect, useState} from 'react'
import UserCards from '../../../ui/card/userCards'
import SkeletonOrder from '../../../ui/skeletons/skeletonOrder'
const page = () => {
  return (
    <div>
      <h1 className='text-4xl mx-8 mb-8 mt-2 text-center'>Your cards</h1>
      <Suspense fallback={<SkeletonOrder/>}>
        {/*TO-DO: Change the user_id to the user_id of the logged in user*/}
        <div className=''>
          <UserCards user_id={1}/>
        </div>
      </Suspense>
    </div>
  )
}

export default page