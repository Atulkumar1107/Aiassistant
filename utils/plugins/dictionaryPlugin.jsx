// Mock dictionary data
const dictionaryData = {
  serendipity: {
    word: "serendipity",
    phonetic: "/ˌsɛr.ənˈdɪp.ɪ.ti/",
    audio: "https://audio.oxforddictionaries.com/en/mp3/serendipity__us_1.mp3",
    meanings: [
      {
        partOfSpeech: "noun",
        definitions: [
          {
            definition: "The occurrence and development of events by chance in a happy or beneficial way.",
            example: "A fortunate stroke of serendipity",
          },
        ],
        synonyms: ["chance", "happy chance", "accident", "happy accident", "fluke"],
      },
    ],
  },
  ephemeral: {
    word: "ephemeral",
    phonetic: "/ɪˈfɛm.ər.əl/",
    audio: "https://audio.oxforddictionaries.com/en/mp3/ephemeral__us_1.mp3",
    meanings: [
      {
        partOfSpeech: "adjective",
        definitions: [
          {
            definition: "Lasting for a very short time.",
            example: "Fashions are ephemeral",
          },
          {
            definition: "(of a plant) Having a very short life cycle.",
            example: "Ephemeral desert plants",
          },
        ],
        synonyms: ["fleeting", "transient", "momentary", "brief", "short-lived"],
      },
    ],
  },
  ubiquitous: {
    word: "ubiquitous",
    phonetic: "/juːˈbɪk.wɪ.təs/",
    audio: "https://audio.oxforddictionaries.com/en/mp3/ubiquitous__us_1.mp3",
    meanings: [
      {
        partOfSpeech: "adjective",
        definitions: [
          {
            definition: "Present, appearing, or found everywhere.",
            example: "His ubiquitous influence was felt by all the family",
          },
        ],
        synonyms: ["omnipresent", "ever-present", "everywhere", "all over the place"],
      },
    ],
  },
}

// Generate mock dictionary data for words not in our database
const generateMockDefinition = (word) => {
  const partOfSpeech = ["noun", "verb", "adjective", "adverb"][Math.floor(Math.random() * 4)]
  const definitions = [
    {
      definition: `This is a mock definition for the word "${word}".`,
      example: `Here's an example using the word "${word}".`,
    },
  ]

  return {
    word: word,
    phonetic: `/mock-phonetic/`,
    meanings: [
      {
        partOfSpeech,
        definitions,
        synonyms: ["similar", "word", "synonym"],
      },
    ],
  }
}

export const dictionaryPlugin = {
  name: "Dictionary",
  description: "Look up definitions of words",
  execute: async (args) => {
    if (!args || args.length === 0) {
      return {
        message: "Please specify a word to look up.",
        data: { error: "No word specified" },
      }
    }

    const word = args[0].toLowerCase().trim()

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Get definition from our mock database or generate one
    const data = dictionaryData[word] || generateMockDefinition(word)

    return {
      message: `Here's the definition of "${word}":`,
      data,
    }
  },
}
