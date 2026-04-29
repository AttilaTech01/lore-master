import type { Question } from "../types";

// Mock quizzes for fallback mode when no AI API key is available
// Each quiz has 5 questions with unique IDs

export const mockQuizzes: Record<string, Question[]> = {
  starwars: [
    {
      id: crypto.randomUUID(),
      question: "Which Jedi Master was the creator of the seven forms of lightsaber combat?",
      options: ["Yoda", "Mace Windu", "Count Dooku", "Kit Fisto"],
      correctAnswer: 2,
      explanation: "Count Dooku was a fencing master and the creator of the seven forms of lightsaber combat.",
    },
    {
      id: crypto.randomUUID(),
      question: "What is the name of the ancient Jedi text that contains the prophecy of the Chosen One?",
      options: ["The Jedi Archives", "The Prophecies of the Whills", "The Jedi Code", "The Book of the Whills"],
      correctAnswer: 1,
      explanation: "The Prophecies of the Whills is an ancient Jedi text that contains the prophecy of the Chosen One.",
    },
    {
      id: crypto.randomUUID(),
      question: "Which planet is known as the 'Jedi Homeworld' in the Star Wars canon?",
      options: ["Coruscant", "Tython", "Jedha", "Ahch-To"],
      correctAnswer: 1,
      explanation: "Tython was the original Jedi Homeworld, where the Jedi Order first established their temple.",
    },
    {
      id: crypto.randomUUID(),
      question: "What is the name of the Force technique that allows a Jedi to preserve their consciousness after death?",
      options: ["Force Ghost", "Essence Transfer", "Mind Trick", "Battle Meditation"],
      correctAnswer: 0,
      explanation: "Force Ghost is the technique that allows Jedi to preserve their consciousness after death.",
    },
    {
      id: crypto.randomUUID(),
      question: "Which Sith Lord is known as 'The Lord of the Sith' and was the first to rule the galaxy?",
      options: ["Darth Bane", "Darth Sidious", "Darth Vader", "Marka Ragnos"],
      correctAnswer: 3,
      explanation: "Marka Ragnos was known as 'The Lord of the Sith' and was the first Sith to rule the galaxy.",
    },
  ],
  lotr: [
    {
      id: crypto.randomUUID(),
      question: "What is the name of the Elvish word for 'friend' that appears in the title 'Fellowship of the Ring'?",
      options: ["Mellon", "Mithrandir", "Mellon", "Eldar"],
      correctAnswer: 2,
      explanation: "Mellon means 'friend' in Elvish - it's the password to the Mines of Moria.",
    },
    {
      id: crypto.randomUUID(),
      question: "Which Vala was known as 'the Weaver' and created the fabric of the world?",
      options: ["Manwë", "Aulë", "Ulmo", "Mandos"],
      correctAnswer: 1,
      explanation: "Aulë was the Vala known as 'the Weaver' who created the fabric of the world and the Dwarves.",
    },
    {
      id: crypto.randomUUID(),
      question: "What is the name of the Elvish afterlife where the spirits of the Elves go?",
      options: ["Halls of Mandos", "Valinor", "The Halls of Waiting", "Eldar"],
      correctAnswer: 0,
      explanation: "The Halls of Mandos is where the spirits of deceased Elves go to rest.",
    },
    {
      id: crypto.randomUUID(),
      question: "Which of the Seven Sons of Fëanor possessed the Silmaril that was recovered by Beren and Lúthien?",
      options: ["Maedhros", "Maglor", "Celegorm", "Caranthir"],
      correctAnswer: 0,
      explanation: "Maedhros was the eldest son of Fëanor and possessed the Silmaril that was recovered.",
    },
    {
      id: crypto.randomUUID(),
      question: "What is the name of the sword that was reforged from the shards of Narsil?",
      options: ["Sting", "Andúril", "Gurthang", "Anglachel"],
      correctAnswer: 1,
      explanation: "Andúril was the name of the sword reforged from the shards of Narsil, wielded by Aragorn.",
    },
  ],
  general: [
    {
      id: crypto.randomUUID(),
      question: "Which ancient civilization is credited with the invention of democracy?",
      options: ["Rome", "Greece", "Egypt", "Persia"],
      correctAnswer: 1,
      explanation: "Ancient Greece, particularly Athens, is credited with the invention of democracy.",
    },
    {
      id: crypto.randomUUID(),
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      correctAnswer: 2,
      explanation: "Au comes from the Latin word 'aurum' meaning gold.",
    },
    {
      id: crypto.randomUUID(),
      question: "In what year did World War II end?",
      options: ["1943", "1944", "1945", "1946"],
      correctAnswer: 2,
      explanation: "World War II ended in 1945 with the surrender of Japan.",
    },
    {
      id: crypto.randomUUID(),
      question: "Which planet is known as the 'Red Planet'?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1,
      explanation: "Mars is known as the 'Red Planet' due to iron oxide on its surface.",
    },
    {
      id: crypto.randomUUID(),
      question: "Who painted the Mona Lisa?",
      options: ["Michelangelo", "Raphael", "Leonardo da Vinci", "Donatello"],
      correctAnswer: 2,
      explanation: "Leonardo da Vinci painted the Mona Lisa in the early 16th century.",
    },
  ],
  pokemon: [
    {
      id: crypto.randomUUID(),
      question: "Which Pokémon is known as the 'Little Warrior' and evolves from Pichu?",
      options: ["Pikachu", "Raichu", "Pichu", "Meowth"],
      correctAnswer: 0,
      explanation: "Pikachu is known as the 'Little Warrior' and evolves from Pichu.",
    },
    {
      id: crypto.randomUUID(),
      question: "What is the only Pokémon that can learn the move 'Sketch' by level up?",
      options: ["Smeargle", "Picrew", "Kecleon", "Farfetch'd"],
      correctAnswer: 0,
      explanation: "Smeargle is the only Pokémon that can learn Sketch by level up.",
    },
    {
      id: crypto.randomUUID(),
      question: "Which Legendary Pokémon is said to be the creator of the Sinnoh region?",
      options: ["Dialga", "Palkia", "Arceus", "Giratina"],
      correctAnswer: 2,
      explanation: "Arceus is said to be the creator of the Sinnoh region.",
    },
    {
      id: crypto.randomUUID(),
      question: "How many different type combinations are there in Pokémon?",
      options: ["17", "18", "19", "20"],
      correctAnswer: 2,
      explanation: "There are 19 different type combinations in Pokémon.",
    },
    {
      id: crypto.randomUUID(),
      question: "Which Pokémon game introduced the 'Wonder Trade' feature?",
      options: ["X and Y", "Black and White", "Sun and Moon", "Diamond and Pearl"],
      correctAnswer: 0,
      explanation: "X and Y introduced the Wonder Trade feature.",
    },
  ],
  harrypotter: [
    {
      id: crypto.randomUUID(),
      question: "What is the name of Harry Potter's owl?",
      options: ["Errol", "Hedwig", "Pigwidgeon", "Scabbers"],
      correctAnswer: 1,
      explanation: "Hedwig is the name of Harry Potter's snowy owl.",
    },
    {
      id: crypto.randomUUID(),
      question: "Which house does Harry Potter belong to?",
      options: ["Slytherin", "Hufflepuff", "Ravenclaw", "Gryffindor"],
      correctAnswer: 3,
      explanation: "Harry Potter belongs to Gryffindor house.",
    },
    {
      id: crypto.randomUUID(),
      question: "What is the core of Harry's wand?",
      options: ["Dragon Heartstring", "Phoenix Feather", "Unicorn Hair", "Thestral Hair"],
      correctAnswer: 1,
      explanation: "The core of Harry's wand is a phoenix feather.",
    },
    {
      id: crypto.randomUUID(),
      question: "Who is the Half-Blood Prince?",
      options: ["Tom Riddle", "Severus Snape", "Harry Potter", "Draco Malfoy"],
      correctAnswer: 1,
      explanation: "Severus Snape is revealed to be the Half-Blood Prince.",
    },
    {
      id: crypto.randomUUID(),
      question: "What is the address of the Leaky Cauldron?",
      options: ["Diagon Alley", "Platform 9¾", "Knockturn Alley", "Hogsmeade"],
      correctAnswer: 0,
      explanation: "The Leaky Cauldron is located in Diagon Alley.",
    },
  ],
  gaming: [
    {
      id: crypto.randomUUID(),
      question: "In 'The Legend of Zelda: Ocarina of Time', what is the name of Link's horse?",
      options: ["Epona", "Nightmare", "Shadow", "Spirit"],
      correctAnswer: 0,
      explanation: "Link's horse is named Epona in Ocarina of Time.",
    },
    {
      id: crypto.randomUUID(),
      question: "Which game is known as the first 3D platformer?",
      options: ["Super Mario 64", "Crash Bandicoot", "Sonic 3D", "Banjo-Kazooie"],
      correctAnswer: 0,
      explanation: "Super Mario 64 is widely considered the first 3D platformer.",
    },
    {
      id: crypto.randomUUID(),
      question: "What is the name of the protagonist in 'Final Fantasy VII'?",
      options: ["Cloud Strife", "Zack Fair", "Sephiroth", "Aerith"],
      correctAnswer: 0,
      explanation: "Cloud Strife is the protagonist of Final Fantasy VII.",
    },
    {
      id: crypto.randomUUID(),
      question: "In 'Minecraft', what is the name of the dimension with purple clouds?",
      options: ["The End", "The Nether", "Overworld", "Aether"],
      correctAnswer: 1,
      explanation: "The Nether is the dimension with purple clouds in Minecraft.",
    },
    {
      id: crypto.randomUUID(),
      question: "Which company created 'Half-Life'?",
      options: ["id Software", "Valve", "Epic Games", "Bungie"],
      correctAnswer: 1,
      explanation: "Valve created Half-Life.",
    },
  ],
};

export function getRandomMockQuiz(): Question[] {
  const keys = Object.keys(mockQuizzes);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return mockQuizzes[randomKey];
}
