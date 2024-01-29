export const renameField = ({
  migrationName,
  documentTypes,
}: {
  migrationName: string
  documentTypes: string[]
}) => `import {defineMigration, at, setIfMissing, unset} from 'sanity/migrate'

const from = 'oldFieldName'
const to = 'newFieldName'

export default defineMigration({
  name: '${migrationName}',
${
  documentTypes.length > 0
    ? `  documentTypes: [${documentTypes.map((t) => JSON.stringify(t)).join(', ')}],\n`
    : ''
}
  migrate: {
    document(doc, path, context) {
      return [
        at(to, setIfMissing(doc[from]))
        at(from, unset())
      ]
    }
  }
})
`
