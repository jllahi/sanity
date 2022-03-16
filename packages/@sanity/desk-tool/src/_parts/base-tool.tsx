import {useRouterState} from '@sanity/base/router'
import {MasterDetailIcon} from '@sanity/icons'
import {ErrorBoundary, ErrorBoundaryProps} from '@sanity/ui'
import React, {useCallback, useEffect, useState} from 'react'
import {IntentResolver} from '../components/intentResolver'
import {StructureError} from '../components/StructureError'
import {DeskTool} from '../DeskTool'
import {getIntentState, setActivePanes} from '../getIntentState'
import {isRecord, isString} from '../helpers'
import {router} from '../router'

export default {
  router,
  canHandleIntent,
  getIntentState,
  title: 'Desk',
  name: 'desk',
  icon: MasterDetailIcon,
  component: DeskToolRoot,
}

function canHandleIntent(intentName: string, params: Record<string, string | undefined>) {
  return Boolean(
    (intentName === 'edit' && params.id) ||
      (intentName === 'create' && params.type) ||
      (intentName === 'create' && params.template)
  )
}

function DeskToolRoot() {
  const routerState = useRouterState() || {}
  const intent = isString(routerState.intent) ? routerState.intent : undefined
  const params = isRecord(routerState.params) ? routerState.params : {}
  const payload = routerState.payload

  useEffect(() => {
    // Set active panes to blank on mount and unmount
    setActivePanes([])
    return () => setActivePanes([])
  }, [])

  const [error, setError] = useState<Error | null>(null)
  const handleCatch: ErrorBoundaryProps['onCatch'] = useCallback((e) => {
    setError(e.error)
  }, [])

  if (error) return <StructureError error={error} />

  return (
    <ErrorBoundary onCatch={handleCatch}>
      {intent ? (
        <IntentResolver intent={intent} params={params as any} payload={payload} />
      ) : (
        <DeskTool onPaneChange={setActivePanes} />
      )}
    </ErrorBoundary>
  )
}
