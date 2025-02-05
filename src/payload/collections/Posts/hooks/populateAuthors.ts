import type { CollectionAfterReadHook } from 'payload'

// The `user` collection has access control locked so that users are not publicly accessible
// This means that we need to populate the authors manually here to protect user privacy
// GraphQL will not return mutated user data that differs from the underlying schema
// So we use an alternative `populatedAuthors` field to populate the user data, hidden from the admin UI
export const populateAuthors: CollectionAfterReadHook = async ({ doc, req: { payload } }) => {
  if (doc?.authors) {
    const authorDocs = await Promise.all(
      doc.authors.map(
        async (author) =>
          await payload.findByID({
            id: typeof author === 'object' ? author?.id : author,
            collection: 'users',
            depth: 0,
          }),
      ),
    )

    doc.populatedAuthors = authorDocs.map((authorDoc) => ({
      id: authorDoc.id,
      name: authorDoc.name,
    }))
  }

  return doc
}
