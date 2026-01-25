import AdminManagment from '@/components/features/Dashboard/AdminManagment/AdminManagment'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminManagment>{children}</AdminManagment>
  )
}

export default layout
