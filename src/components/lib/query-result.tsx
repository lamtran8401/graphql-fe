import { ApolloError } from '@apollo/client'
import React, { PropsWithChildren } from 'react'
import SpinnerContainer from '../spinner'

interface QueryResultProps {
  loading: boolean
  error?: ApolloError | undefined
  data?: unknown
}

const QueryResult: React.FC<PropsWithChildren<QueryResultProps>> = ({
  loading,
  error,
  data,
  children,
}): React.ReactElement<any, any> | null => {
  if (error) {
    console.log(error)
    return <p>ERROR: {error.message}</p>
  }
  if (loading) {
    return <SpinnerContainer></SpinnerContainer>
  }
  if (data) {
    return <>{children}</>
  }

  return <p>Nothing to show...</p>
}

export default QueryResult
