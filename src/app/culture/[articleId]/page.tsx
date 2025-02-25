'use client';

import CulturalInsights from '@/components/CulturalInsights';
import MusicPlaylists from '@/components/culture/MusicPlaylists';
import DinosaurAnimation from '@/components/ui/DinosaurAnimation';
import { CulturalContent } from '@/types';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CultureArticle() {
  const params = useParams();
  const [article, setArticle] = useState<CulturalContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<'overview' | 'instruments' | 'songs' | 'artists'>('overview');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const mockArticles: { [key: string]: CulturalContent } = {
          'traditional-music': {
            id: 'traditional-music',
            title: 'Traditional Bosnian Music',
            type: 'song',
            content: {
              overview: `
                🎵 Welcome to the enchanting world of Bosnian traditional music! 
                
                Discover the soul-stirring melodies of sevdalinka, Bosnia's unique musical heritage that captures 
                the essence of love, longing, and life. This traditional art form blends Eastern musical elements 
                with Slavic lyrical traditions, creating a mesmerizing tapestry of sound that has captivated 
                listeners for generations.
              `,
              instruments: {
                title: 'Traditional Instruments',
                items: [
                  {
                    name: 'Saz',
                    description: 'A long-necked lute essential in sevdalinka music',
                    imageUrl: '/images/saz.jpg'
                  },
                  {
                    name: 'Šargija',
                    description: 'Similar to the saz but with a deeper, richer sound',
                    imageUrl: '/images/sargija.jpg'
                  },
                  {
                    name: 'Harmonika',
                    description: 'The Bosnian accordion, central to folk music',
                    imageUrl: '/images/harmonika.jpg'
                  },
                  {
                    name: 'Violina',
                    description: 'Violin, often used in urban sevdalinka',
                    imageUrl: '/images/violina.jpg'
                  },
                  {
                    name: 'Def',
                    description: 'A large frame drum used in traditional ensembles',
                    imageUrl: '/images/def.jpg'
                  }
                ]
              },
              songs: {
                title: 'Famous Sevdalinka Songs',
                items: [
                  {
                    title: 'Emina',
                    description: 'A classic sevdalinka about a beautiful girl from Mostar',
                    youtubeId: 'xyz123'
                  },
                  {
                    title: 'Kad ja pođoh na Bendbaša',
                    description: 'A beloved song about old Sarajevo',
                    youtubeId: 'abc456'
                  },
                  {
                    title: 'Snijeg pade na behar, na voće',
                    description: 'A romantic sevdalinka',
                    youtubeId: 'def789'
                  },
                  {
                    title: 'Moj dilbere',
                    description: 'A traditional love song',
                    youtubeId: 'ghi012'
                  },
                  {
                    title: 'U Stambolu na Bosforu',
                    description: 'A song connecting Bosnian and Ottoman heritage',
                    youtubeId: 'jkl345'
                  }
                ]
              },
              artists: {
                title: 'Notable Performers',
                items: [
                  {
                    name: 'Safet Isović',
                    description: 'Known as the "King of Sevdah"',
                    imageUrl: '/images/safet-isovic.jpg'
                  },
                  {
                    name: 'Zaim Imamović',
                    description: 'A legendary sevdah interpreter',
                    imageUrl: '/images/zaim-imamovic.jpg'
                  },
                  {
                    name: 'Himzo Polovina',
                    description: 'Famous for his authentic style',
                    imageUrl: '/images/himzo-polovina.jpg'
                  },
                  {
                    name: 'Amira Medunjanin',
                    description: 'Contemporary sevdah artist',
                    imageUrl: '/images/amira-medunjanin.jpg'
                  },
                  {
                    name: 'Damir Imamović',
                    description: 'Modern sevdah innovator',
                    imageUrl: '/images/damir-imamovic.jpg'
                  }
                ]
              }
            },
            mediaUrls: [
              '/images/traditional-music.jpg',
              '/images/sevdah.jpg',
              '/images/instruments.jpg',
              '/images/performers.jpg'
            ],
            tags: ['music', 'tradition', 'culture', 'sevdah', 'folk', 'instruments'],
            musicPlaylists: {
              youtube: [
                {
                  playlistId: 'PLHDS0UHVdU1zdGJZPSGxSE6XToqFGzozN',
                  title: 'Traditional Bosnian Music Collection',
                  description: 'A curated collection of authentic Bosnian traditional music, featuring classic sevdalinke and folk songs.'
                }
              ],
              spotify: [
                {
                  playlistId: '4MjOgg0gV9sXk2mTNb6Gwb',
                  title: 'Bosnian Traditional Classics',
                  description: 'A collection of timeless Bosnian traditional music and sevdalinke.'
                }
              ]
            },
            relatedVocabulary: [
              {
                id: 'vocab-sevdah',
                bosnian: 'sevdah',
                english: 'traditional love song',
                chinese: '传统情歌',
                pronunciation: 'SEV-dah',
                context: 'Traditional Bosnian love songs',
                category: 'music',
                difficulty: 'beginner',
                usage: ['Pjevati sevdalinke', 'Slušati sevdah'],
                examples: ['Sevdah je duša Bosne.'],
                audioUrl: '/audio/sevdah.mp3',
                reviewCount: 0,
                successRate: 0
              },
              {
                id: 'vocab-saz',
                bosnian: 'saz',
                english: 'long-necked lute',
                chinese: '长颈琉特琴',
                pronunciation: 'saz',
                context: 'Traditional string instrument',
                category: 'music',
                difficulty: 'beginner',
                usage: ['Svirati saz', 'Zvuk saza'],
                examples: ['Saz je važan instrument u sevdalinci.'],
                audioUrl: '/audio/saz.mp3',
                reviewCount: 0,
                successRate: 0
              },
              {
                id: 'vocab-harmonika',
                bosnian: 'harmonika',
                english: 'accordion',
                chinese: '手风琴',
                pronunciation: 'har-MO-nee-ka',
                context: 'Traditional accordion music',
                category: 'music',
                difficulty: 'beginner',
                usage: ['Svirati harmoniku', 'Zvuk harmonike'],
                examples: ['Harmonika je popularna u narodnoj muzici.'],
                audioUrl: '/audio/harmonika.mp3',
                reviewCount: 0,
                successRate: 0
              },
              {
                id: 'vocab-pjesma',
                bosnian: 'pjesma',
                english: 'song',
                chinese: '歌曲',
                pronunciation: 'PYES-ma',
                context: 'Music and singing',
                category: 'music',
                difficulty: 'beginner',
                usage: ['Narodna pjesma', 'Pjevati pjesmu'],
                examples: ['Ovo je lijepa pjesma.'],
                audioUrl: '/audio/pjesma.mp3',
                reviewCount: 0,
                successRate: 0
              }
            ]
          },
          'bosnian-war-literature': {
            id: 'bosnian-war-literature',
            title: 'Literature of the Bosnian War',
            type: 'article',
            content: `
              The Bosnian War (1992-1995) has profoundly influenced Bosnian literature, 
              giving rise to powerful works that document the human experience during 
              this tragic period. Authors have captured both the horror of war and 
              the resilience of the human spirit through various literary forms.

              Notable Authors and Works:
              - Semezdin Mehmedinović: "Sarajevo Blues" - A poetic chronicle of wartime Sarajevo
              - Aleksandar Hemon: "The Question of Bruno" - Stories connecting pre-war Bosnia with exile
              - Miljenko Jergović: "Sarajevo Marlboro" - Short stories about life during the siege
              - Zlata Filipović: "Zlata's Diary" - A young girl's perspective of the war
              - Dževad Karahasan: "Sarajevo: Exodus of a City" - Essays about the city under siege

              Key Themes in War Literature:
              1. Survival and Resilience
              2. Cultural Identity and Loss
              3. Memory and Trauma
              4. Exile and Return
              5. Reconciliation and Healing

              Impact on Contemporary Literature:
              The war's impact continues to resonate in contemporary Bosnian literature. 
              Many current writers explore themes of post-war recovery, intergenerational 
              trauma, and the rebuilding of society. Their works contribute to the 
              collective memory and understanding of this historical period.

              International Recognition:
              Several Bosnian authors have gained international acclaim for their war literature:
              - "The Bridge on the Drina" by Ivo Andrić (Nobel Prize winner)
              - "People of Sarajevo" by Nenad Veličković
              - "How the Soldier Repairs the Gramophone" by Saša Stanišić
              - "The Book of My Lives" by Aleksandar Hemon

              These works not only serve as historical documents but also as powerful 
              reminders of the importance of peace and understanding between cultures. 
              They explore themes of identity, loss, survival, and the preservation of 
              humanity in times of crisis.

              Literary Movements:
              - War Poetry Movement
              - Documentary Prose
              - Testimonial Literature
              - Post-war Modernism
              - Diaspora Writing
            `,
            mediaUrls: [
              '/images/sarajevo-library.jpg',
              '/images/bosnian-books.jpg',
              '/images/war-manuscripts.jpg',
              '/images/author-portraits.jpg'
            ],
            tags: ['literature', 'history', 'war', 'culture', 'books', 'poetry', 'memoir'],
            relatedVocabulary: [
              {
                id: 'vocab-knjiga',
                bosnian: 'knjiga',
                english: 'book',
                chinese: '书',
                pronunciation: 'KNYI-ga',
                context: 'Literature and reading',
                category: 'literature',
                difficulty: 'beginner',
                usage: ['Čitati knjigu', 'Pisati knjigu'],
                examples: ['Ova knjiga govori o ratu.'],
                audioUrl: '/audio/knjiga.mp3',
                reviewCount: 0,
                successRate: 0
              },
              {
                id: 'vocab-pisac',
                bosnian: 'pisac',
                english: 'writer',
                chinese: '作家',
                pronunciation: 'PEE-sats',
                context: 'Literature and authors',
                category: 'literature',
                difficulty: 'beginner',
                usage: ['Poznati pisac', 'Bosanski pisac'],
                examples: ['On je pisac ratnih priča.'],
                audioUrl: '/audio/pisac.mp3',
                reviewCount: 0,
                successRate: 0
              },
              {
                id: 'vocab-rat',
                bosnian: 'rat',
                english: 'war',
                chinese: '战争',
                pronunciation: 'rat',
                context: 'Historical events',
                category: 'history',
                difficulty: 'beginner',
                usage: ['Ratno vrijeme', 'Poslije rata'],
                examples: ['Rat je trajao od 1992. do 1995.'],
                audioUrl: '/audio/rat.mp3',
                reviewCount: 0,
                successRate: 0
              },
              {
                id: 'vocab-pjesnik',
                bosnian: 'pjesnik',
                english: 'poet',
                chinese: '诗人',
                pronunciation: 'PYES-nik',
                context: 'Literature and poetry',
                category: 'literature',
                difficulty: 'beginner',
                usage: ['Ratni pjesnik', 'Moderni pjesnik'],
                examples: ['Pjesnik piše o ratu.'],
                audioUrl: '/audio/pjesnik.mp3',
                reviewCount: 0,
                successRate: 0
              },
              {
                id: 'vocab-priča',
                bosnian: 'priča',
                english: 'story',
                chinese: '故事',
                pronunciation: 'PRI-cha',
                context: 'Literature and storytelling',
                category: 'literature',
                difficulty: 'beginner',
                usage: ['Ratna priča', 'Ispričati priču'],
                examples: ['Njegova priča je potresna.'],
                audioUrl: '/audio/prica.mp3',
                reviewCount: 0,
                successRate: 0
              }
            ]
          }
        };

        const articleId = params.articleId as string;
        const foundArticle = mockArticles[articleId];
        
        if (foundArticle) {
          setArticle(foundArticle);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching article:', error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.articleId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="space-y-8 text-center">
          <DinosaurAnimation message="Developer is still cooking..." />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center space-x-2"
          >
            <motion.div
              className="h-2 w-2 rounded-full bg-purple-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="h-2 w-2 rounded-full bg-pink-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                delay: 0.2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="h-2 w-2 rounded-full bg-indigo-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                delay: 0.4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-8">
              What's Coming Next?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Rich History',
                  description: 'Journey through Bosnia\'s fascinating past',
                  icon: '🏰'
                },
                {
                  title: 'Cultural Traditions',
                  description: 'Experience timeless Bosnian customs',
                  icon: '🎭'
                },
                {
                  title: 'Bosnian Cuisine',
                  description: 'Savor the flavors of traditional dishes',
                  icon: '🥘'
                },
                {
                  title: 'Arts & Crafts',
                  description: 'Discover traditional Bosnian artistry',
                  icon: '🎨'
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-purple-500/50"
                >
                  <span className="text-4xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="space-y-8 text-center">
          <DinosaurAnimation message="Developer is still cooking..." />
          
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-8">
              What's Coming Next?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Rich History',
                  description: 'Journey through Bosnia\'s fascinating past',
                  icon: '🏰'
                },
                {
                  title: 'Cultural Traditions',
                  description: 'Experience timeless Bosnian customs',
                  icon: '🎭'
                },
                {
                  title: 'Bosnian Cuisine',
                  description: 'Savor the flavors of traditional dishes',
                  icon: '🥘'
                },
                {
                  title: 'Arts & Crafts',
                  description: 'Discover traditional Bosnian artistry',
                  icon: '🎨'
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-purple-500/50"
                >
                  <span className="text-4xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (typeof article.content === 'string') {
      return <div className="prose prose-lg dark:prose-invert max-w-none">{article.content}</div>;
    }

    const content = article.content as any;
    
    switch (activeSection) {
      case 'overview':
        return content.overview ? (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {content.overview}
          </div>
        ) : (
          <div className="space-y-12">
            <DinosaurAnimation message="Building Amazing Content..." />
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-8">
                What's Coming Next?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: 'Rich History',
                    description: 'Journey through Bosnia\'s fascinating past',
                    icon: '🏰'
                  },
                  {
                    title: 'Cultural Traditions',
                    description: 'Experience timeless Bosnian customs',
                    icon: '🎭'
                  },
                  {
                    title: 'Bosnian Cuisine',
                    description: 'Savor the flavors of traditional dishes',
                    icon: '🥘'
                  },
                  {
                    title: 'Arts & Crafts',
                    description: 'Discover traditional Bosnian artistry',
                    icon: '🎨'
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-purple-500/50"
                  >
                    <span className="text-4xl mb-4 block">{feature.icon}</span>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'instruments':
        return content.instruments?.items?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.instruments.items.map((instrument: any) => (
              <motion.div
                key={instrument.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden"
              >
                <div className="aspect-video relative">
                  <img
                    src={instrument.imageUrl}
                    alt={instrument.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{instrument.name}</h3>
                  <p className="text-gray-300">{instrument.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            <DinosaurAnimation message="Crafting Musical Instruments..." />
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-8">
                What's Coming Next?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: 'Rich History',
                    description: 'Journey through Bosnia\'s fascinating past',
                    icon: '🏰'
                  },
                  {
                    title: 'Cultural Traditions',
                    description: 'Experience timeless Bosnian customs',
                    icon: '🎭'
                  },
                  {
                    title: 'Bosnian Cuisine',
                    description: 'Savor the flavors of traditional dishes',
                    icon: '🥘'
                  },
                  {
                    title: 'Arts & Crafts',
                    description: 'Discover traditional Bosnian artistry',
                    icon: '🎨'
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-purple-500/50"
                  >
                    <span className="text-4xl mb-4 block">{feature.icon}</span>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'songs':
        return content.songs?.items?.length ? (
          <div className="space-y-6">
            {content.songs.items.map((song: any) => (
              <motion.div
                key={song.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{song.title}</h3>
                  <p className="text-gray-300 mb-4">{song.description}</p>
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${song.youtubeId}`}
                    title={song.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            <DinosaurAnimation message="Composing Beautiful Melodies..." />
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-8">
                What's Coming Next?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: 'Rich History',
                    description: 'Journey through Bosnia\'s fascinating past',
                    icon: '🏰'
                  },
                  {
                    title: 'Cultural Traditions',
                    description: 'Experience timeless Bosnian customs',
                    icon: '🎭'
                  },
                  {
                    title: 'Bosnian Cuisine',
                    description: 'Savor the flavors of traditional dishes',
                    icon: '🥘'
                  },
                  {
                    title: 'Arts & Crafts',
                    description: 'Discover traditional Bosnian artistry',
                    icon: '🎨'
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-purple-500/50"
                  >
                    <span className="text-4xl mb-4 block">{feature.icon}</span>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'artists':
        return content.artists?.items?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.artists.items.map((artist: any) => (
              <motion.div
                key={artist.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden"
              >
                <div className="aspect-square relative">
                  <img
                    src={artist.imageUrl}
                    alt={artist.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{artist.name}</h3>
                  <p className="text-gray-300">{artist.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            <DinosaurAnimation message="Gathering Talented Artists..." />
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-8">
                What's Coming Next?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: 'Rich History',
                    description: 'Journey through Bosnia\'s fascinating past',
                    icon: '🏰'
                  },
                  {
                    title: 'Cultural Traditions',
                    description: 'Experience timeless Bosnian customs',
                    icon: '🎭'
                  },
                  {
                    title: 'Bosnian Cuisine',
                    description: 'Savor the flavors of traditional dishes',
                    icon: '🥘'
                  },
                  {
                    title: 'Arts & Crafts',
                    description: 'Discover traditional Bosnian artistry',
                    icon: '🎨'
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-purple-500/50"
                  >
                    <span className="text-4xl mb-4 block">{feature.icon}</span>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            {article.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {['overview', 'instruments', 'songs', 'artists'].map((section) => (
            <motion.button
              key={section}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection(section as any)}
              className={`px-6 py-3 rounded-lg transition-colors ${
                activeSection === section
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </motion.button>
          ))}
        </div>

        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          {renderContent()}
        </motion.div>

        {article.type === 'song' && article.musicPlaylists && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Featured Playlists
            </h2>
            <MusicPlaylists
              spotify={article.musicPlaylists.spotify}
              youtube={article.musicPlaylists.youtube}
            />
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-500">
            Related Vocabulary
          </h2>
          <CulturalInsights vocabulary={article.relatedVocabulary} />
        </div>
      </div>
    </div>
  );
} 