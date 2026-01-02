import React from 'react'
import ViewHealthInsurance from './ViewHealthInsurance'
import ViewInsurance from './ViewInsurance'
import ViewFixedDeposite from './ViewFixedDeposite'
import ViewMF from './ViewMF'
import ViewLoan from './ViewLoan'
import ViewBonds from './ViewBonds'
import ViewStocks from './ViewStocks'
import ViewUser from './ViewUser'

export default function Users() {
  return (
    <>
    <ViewUser />
    <ViewInsurance />
    <ViewHealthInsurance />
    <ViewMF />
    <ViewLoan/>
    <ViewFixedDeposite />
    <ViewBonds />
    <ViewStocks />

    
    </>
  )
}
