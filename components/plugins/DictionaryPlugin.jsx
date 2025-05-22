"use client"

import { Volume2 } from "lucide-react"

const DictionaryPlugin = ({ data }) => {
  if (!data || data.error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mt-2">
        <p className="text-red-600 dark:text-red-400">{data?.error || "Unable to fetch definition"}</p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-4 mt-2">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100">{data.word}</h3>
          <p className="text-gray-600 dark:text-gray-300 italic">{data.phonetic}</p>
        </div>
        {data.audio && (
          <button
            className="p-2 rounded-full bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-700"
            onClick={() => {
              const audio = new Audio(data.audio)
              audio.play()
            }}
          >
            <Volume2 className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="mt-4 space-y-4">
        {data.meanings.map((meaning, index) => (
          <div key={index}>
            <div className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">{meaning.partOfSpeech}</div>
            <ol className="list-decimal list-inside space-y-2 pl-1">
              {meaning.definitions.map((def, idx) => (
                <li key={idx} className="text-gray-700 dark:text-gray-200">
                  {def.definition}
                  {def.example && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 pl-5 italic">"{def.example}"</p>
                  )}
                </li>
              ))}
            </ol>

            {meaning.synonyms && meaning.synonyms.length > 0 && (
              <div className="mt-2 pl-1">
                <span className="text-sm text-gray-600 dark:text-gray-300">Synonyms: </span>
                <span className="text-sm text-gray-700 dark:text-gray-200">{meaning.synonyms.join(", ")}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DictionaryPlugin
