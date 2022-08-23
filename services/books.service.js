import { DataBooks } from './data.js'
import { storageService } from '../services/storage.service.js'
import { utilService } from '../services/util.service.js'

export const BooksService = {
    query,
    getBookById,
    addReview,
    getApiBooks,
    addGoogleBook,
    getNextBookId
}

const gBooks = DataBooks.getBooks()
const STORAGE_KEY = 'missBookDB'

function query(filterBy) {
    // console.log(gBooks);
    // let books = gBooks
    let books = _loadFromStorage(STORAGE_KEY)
    if (!books) books = gBooks
    console.log(filterBy)
    if (filterBy) {
        let { name, price } = filterBy
        console.log('filterBy from service', filterBy);
        if (!price) price = 0;
        console.log('filterBy from service', books);
        books = books.filter(book => (
            book.title.includes(name) &&
            book.listPrice.amount <= price
        ))
    }
    storageService.saveToStorage(STORAGE_KEY, books)
    console.log(books)
    return Promise.resolve(books)
}

function getBookById(bookId) {
    if (!bookId) return Promise.resolve(null)
    const books = _loadFromStorage(STORAGE_KEY)
    const selectedBook = books.find(book => book.id === bookId)
    console.log(selectedBook);
    return Promise.resolve(selectedBook)
}

function addReview(id, review) {
    const books = _loadFromStorage(STORAGE_KEY)
    console.log(books);
    const selectedBook = books.find(book => book.id === id)
    if (!selectedBook['review']) selectedBook['review'] = []
    selectedBook['review'].unshift(review)
    _saveToStorage(books)
    return Promise.resolve()
}

function getApiBooks(value) {
    // value = value.replace(' ', '+')
    // const books = axios.get(`https://www.googleapis.com/books/v1/volumes?q=${value}`).then(books => books.data.items)
    // console.log(books);
    let books = {
        "kind": "books#volumes",
        "totalItems": 517,
        "items": [
            {
                "kind": "books#volume",
                "id": "K2_xAAAAMAAJ",
                "etag": "H5HC0YZyU7U",
                "selfLink": "https://www.googleapis.com/books/v1/volumes/K2_xAAAAMAAJ",
                "volumeInfo": {
                    "title": "\"Hey Padre\"",
                    "subtitle": "The Saga of a Regimental Chaplain in World War II",
                    "authors": [
                        "Thomas J. Donnelly"
                    ],
                    "publishedDate": "1981",
                    "industryIdentifiers": [
                        {
                            "type": "OTHER",
                            "identifier": "WISC:89062202528"
                        }
                    ],
                    "readingModes": {
                        "text": false,
                        "image": false
                    },
                    "pageCount": 132,
                    "printType": "BOOK",
                    "categories": [
                        "Military chaplains"
                    ],
                    "maturityRating": "NOT_MATURE",
                    "allowAnonLogging": false,
                    "contentVersion": "1.3.2.0.preview.0",
                    "panelizationSummary": {
                        "containsEpubBubbles": false,
                        "containsImageBubbles": false
                    },
                    "imageLinks": {
                        "smallThumbnail": "http://books.google.com/books/content?id=K2_xAAAAMAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                        "thumbnail": "http://books.google.com/books/content?id=K2_xAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    },
                    "language": "en",
                    "previewLink": "http://books.google.com/books?id=K2_xAAAAMAAJ&q=hey&dq=hey&hl=&cd=1&source=gbs_api",
                    "infoLink": "http://books.google.com/books?id=K2_xAAAAMAAJ&dq=hey&hl=&source=gbs_api",
                    "canonicalVolumeLink": "https://books.google.com/books/about/Hey_Padre.html?hl=&id=K2_xAAAAMAAJ"
                },
                "saleInfo": {
                    "country": "IL",
                    "saleability": "NOT_FOR_SALE",
                    "isEbook": false
                },
                "accessInfo": {
                    "country": "IL",
                    "viewability": "NO_PAGES",
                    "embeddable": false,
                    "publicDomain": false,
                    "textToSpeechPermission": "ALLOWED",
                    "epub": {
                        "isAvailable": false
                    },
                    "pdf": {
                        "isAvailable": false
                    },
                    "webReaderLink": "http://play.google.com/books/reader?id=K2_xAAAAMAAJ&hl=&printsec=frontcover&source=gbs_api",
                    "accessViewStatus": "NONE",
                    "quoteSharingAllowed": false
                },
                "searchInfo": {
                    "textSnippet": "The troops started to move and I was ready for the initial march when a medic rushed up and said , “ \u003cb\u003eHey\u003c/b\u003e Padre , the doctor is taking care of an old man in a shack down the road . He said you should come . &quot; I accompanied him to the&nbsp;..."
                }
            },
            {
                "kind": "books#volume",
                "id": "4zpQAAAAMAAJ",
                "etag": "MkfYIUxT5y8",
                "selfLink": "https://www.googleapis.com/books/v1/volumes/4zpQAAAAMAAJ",
                "volumeInfo": {
                    "title": "Hey Day",
                    "authors": [
                        "Jordi Labanda",
                        "Tyler Brule"
                    ],
                    "publisher": "Editorial Rm",
                    "publishedDate": "2003",
                    "description": "Artwork by Jordi Labanda. Contributions by Tyler Brule.",
                    "industryIdentifiers": [
                        {
                            "type": "OTHER",
                            "identifier": "UOM:39015047966000"
                        }
                    ],
                    "readingModes": {
                        "text": false,
                        "image": false
                    },
                    "pageCount": 152,
                    "printType": "BOOK",
                    "categories": [
                        "Design"
                    ],
                    "maturityRating": "NOT_MATURE",
                    "allowAnonLogging": false,
                    "contentVersion": "0.2.2.0.preview.0",
                    "panelizationSummary": {
                        "containsEpubBubbles": false,
                        "containsImageBubbles": false
                    },
                    "imageLinks": {
                        "smallThumbnail": "http://books.google.com/books/content?id=4zpQAAAAMAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                        "thumbnail": "http://books.google.com/books/content?id=4zpQAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    },
                    "language": "en",
                    "previewLink": "http://books.google.com/books?id=4zpQAAAAMAAJ&q=hey&dq=hey&hl=&cd=2&source=gbs_api",
                    "infoLink": "http://books.google.com/books?id=4zpQAAAAMAAJ&dq=hey&hl=&source=gbs_api",
                    "canonicalVolumeLink": "https://books.google.com/books/about/Hey_Day.html?hl=&id=4zpQAAAAMAAJ"
                },
                "saleInfo": {
                    "country": "IL",
                    "saleability": "NOT_FOR_SALE",
                    "isEbook": false
                },
                "accessInfo": {
                    "country": "IL",
                    "viewability": "NO_PAGES",
                    "embeddable": false,
                    "publicDomain": false,
                    "textToSpeechPermission": "ALLOWED",
                    "epub": {
                        "isAvailable": false
                    },
                    "pdf": {
                        "isAvailable": false
                    },
                    "webReaderLink": "http://play.google.com/books/reader?id=4zpQAAAAMAAJ&hl=&printsec=frontcover&source=gbs_api",
                    "accessViewStatus": "NONE",
                    "quoteSharingAllowed": false
                }
            },
            {
                "kind": "books#volume",
                "id": "23ag6NOrBt0C",
                "etag": "ctrpeslonaU",
                "selfLink": "https://www.googleapis.com/books/v1/volumes/23ag6NOrBt0C",
                "volumeInfo": {
                    "title": "Hey Kids!",
                    "subtitle": "The Mobilization of American Children in the Second World War",
                    "authors": [
                        "Robert William Kirk"
                    ],
                    "publishedDate": "1991",
                    "industryIdentifiers": [
                        {
                            "type": "OTHER",
                            "identifier": "UCAL:X47424"
                        }
                    ],
                    "readingModes": {
                        "text": false,
                        "image": false
                    },
                    "pageCount": 406,
                    "printType": "BOOK",
                    "categories": [
                        "Child volunteers"
                    ],
                    "maturityRating": "NOT_MATURE",
                    "allowAnonLogging": false,
                    "contentVersion": "0.1.1.0.preview.0",
                    "panelizationSummary": {
                        "containsEpubBubbles": false,
                        "containsImageBubbles": false
                    },
                    "imageLinks": {
                        "smallThumbnail": "http://books.google.com/books/content?id=23ag6NOrBt0C&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                        "thumbnail": "http://books.google.com/books/content?id=23ag6NOrBt0C&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    },
                    "language": "en",
                    "previewLink": "http://books.google.com/books?id=23ag6NOrBt0C&q=hey&dq=hey&hl=&cd=3&source=gbs_api",
                    "infoLink": "http://books.google.com/books?id=23ag6NOrBt0C&dq=hey&hl=&source=gbs_api",
                    "canonicalVolumeLink": "https://books.google.com/books/about/Hey_Kids.html?hl=&id=23ag6NOrBt0C"
                },
                "saleInfo": {
                    "country": "IL",
                    "saleability": "NOT_FOR_SALE",
                    "isEbook": false
                },
                "accessInfo": {
                    "country": "IL",
                    "viewability": "NO_PAGES",
                    "embeddable": false,
                    "publicDomain": false,
                    "textToSpeechPermission": "ALLOWED",
                    "epub": {
                        "isAvailable": false
                    },
                    "pdf": {
                        "isAvailable": false
                    },
                    "webReaderLink": "http://play.google.com/books/reader?id=23ag6NOrBt0C&hl=&printsec=frontcover&source=gbs_api",
                    "accessViewStatus": "NONE",
                    "quoteSharingAllowed": false
                }
            },
            {
                "kind": "books#volume",
                "id": "n8ndyUDHLbwC",
                "etag": "TdWtet6p274",
                "selfLink": "https://www.googleapis.com/books/v1/volumes/n8ndyUDHLbwC",
                "volumeInfo": {
                    "title": "Hey, Teacher!",
                    "authors": [
                        "Janette Oke"
                    ],
                    "publisher": "Bethany House Pub",
                    "publishedDate": "1981",
                    "description": "\"A handbook for Sunday School teachers\"--Cover subtitle.",
                    "industryIdentifiers": [
                        {
                            "type": "ISBN_10",
                            "identifier": "093499806X"
                        },
                        {
                            "type": "ISBN_13",
                            "identifier": "9780934998062"
                        }
                    ],
                    "readingModes": {
                        "text": false,
                        "image": false
                    },
                    "pageCount": 94,
                    "printType": "BOOK",
                    "categories": [
                        "Christian education"
                    ],
                    "maturityRating": "NOT_MATURE",
                    "allowAnonLogging": false,
                    "contentVersion": "1.3.2.0.preview.0",
                    "panelizationSummary": {
                        "containsEpubBubbles": false,
                        "containsImageBubbles": false
                    },
                    "imageLinks": {
                        "smallThumbnail": "http://books.google.com/books/content?id=n8ndyUDHLbwC&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                        "thumbnail": "http://books.google.com/books/content?id=n8ndyUDHLbwC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    },
                    "language": "en",
                    "previewLink": "http://books.google.com/books?id=n8ndyUDHLbwC&q=hey&dq=hey&hl=&cd=4&source=gbs_api",
                    "infoLink": "http://books.google.com/books?id=n8ndyUDHLbwC&dq=hey&hl=&source=gbs_api",
                    "canonicalVolumeLink": "https://books.google.com/books/about/Hey_Teacher.html?hl=&id=n8ndyUDHLbwC"
                },
                "saleInfo": {
                    "country": "IL",
                    "saleability": "NOT_FOR_SALE",
                    "isEbook": false
                },
                "accessInfo": {
                    "country": "IL",
                    "viewability": "NO_PAGES",
                    "embeddable": false,
                    "publicDomain": false,
                    "textToSpeechPermission": "ALLOWED",
                    "epub": {
                        "isAvailable": false
                    },
                    "pdf": {
                        "isAvailable": false
                    },
                    "webReaderLink": "http://play.google.com/books/reader?id=n8ndyUDHLbwC&hl=&printsec=frontcover&source=gbs_api",
                    "accessViewStatus": "NONE",
                    "quoteSharingAllowed": false
                }
            },
            {
                "kind": "books#volume",
                "id": "YMkWFQJ8rLkC",
                "etag": "VTWn45FYFv4",
                "selfLink": "https://www.googleapis.com/books/v1/volumes/YMkWFQJ8rLkC",
                "volumeInfo": {
                    "title": "Hey, Daddy!",
                    "subtitle": "Animal Fathers and Their Babies",
                    "authors": [
                        "Mary Batten"
                    ],
                    "publisher": "Peachtree Pub Limited",
                    "publishedDate": "2002",
                    "description": "Introduces the important roles that some animal fathers play in the development of their offspring, with examples of specific kinds of birds, mammals, and other creatures that thrive under a father's care.",
                    "industryIdentifiers": [
                        {
                            "type": "ISBN_10",
                            "identifier": "1561452726"
                        },
                        {
                            "type": "ISBN_13",
                            "identifier": "9781561452729"
                        }
                    ],
                    "readingModes": {
                        "text": false,
                        "image": false
                    },
                    "pageCount": 32,
                    "printType": "BOOK",
                    "categories": [
                        "Juvenile Nonfiction"
                    ],
                    "averageRating": 4,
                    "ratingsCount": 1,
                    "maturityRating": "NOT_MATURE",
                    "allowAnonLogging": false,
                    "contentVersion": "0.1.3.0.preview.0",
                    "panelizationSummary": {
                        "containsEpubBubbles": false,
                        "containsImageBubbles": false
                    },
                    "imageLinks": {
                        "smallThumbnail": "http://books.google.com/books/content?id=YMkWFQJ8rLkC&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                        "thumbnail": "http://books.google.com/books/content?id=YMkWFQJ8rLkC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    },
                    "language": "en",
                    "previewLink": "http://books.google.com/books?id=YMkWFQJ8rLkC&q=hey&dq=hey&hl=&cd=5&source=gbs_api",
                    "infoLink": "http://books.google.com/books?id=YMkWFQJ8rLkC&dq=hey&hl=&source=gbs_api",
                    "canonicalVolumeLink": "https://books.google.com/books/about/Hey_Daddy.html?hl=&id=YMkWFQJ8rLkC"
                },
                "saleInfo": {
                    "country": "IL",
                    "saleability": "NOT_FOR_SALE",
                    "isEbook": false
                },
                "accessInfo": {
                    "country": "IL",
                    "viewability": "NO_PAGES",
                    "embeddable": false,
                    "publicDomain": false,
                    "textToSpeechPermission": "ALLOWED",
                    "epub": {
                        "isAvailable": false
                    },
                    "pdf": {
                        "isAvailable": false
                    },
                    "webReaderLink": "http://play.google.com/books/reader?id=YMkWFQJ8rLkC&hl=&printsec=frontcover&source=gbs_api",
                    "accessViewStatus": "NONE",
                    "quoteSharingAllowed": false
                }
            },
            {
                "kind": "books#volume",
                "id": "EFFDAAAAIAAJ",
                "etag": "9Rg7dANATRU",
                "selfLink": "https://www.googleapis.com/books/v1/volumes/EFFDAAAAIAAJ",
                "volumeInfo": {
                    "title": "\"Hey Rube\"",
                    "authors": [
                        "Bert J. Chipman"
                    ],
                    "publishedDate": "1933",
                    "industryIdentifiers": [
                        {
                            "type": "OTHER",
                            "identifier": "UCAL:$B29175"
                        }
                    ],
                    "readingModes": {
                        "text": false,
                        "image": false
                    },
                    "pageCount": 212,
                    "printType": "BOOK",
                    "categories": [
                        "Circus"
                    ],
                    "maturityRating": "NOT_MATURE",
                    "allowAnonLogging": false,
                    "contentVersion": "1.3.2.0.preview.0",
                    "panelizationSummary": {
                        "containsEpubBubbles": false,
                        "containsImageBubbles": false
                    },
                    "imageLinks": {
                        "smallThumbnail": "http://books.google.com/books/content?id=EFFDAAAAIAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                        "thumbnail": "http://books.google.com/books/content?id=EFFDAAAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    },
                    "language": "en",
                    "previewLink": "http://books.google.com/books?id=EFFDAAAAIAAJ&q=hey&dq=hey&hl=&cd=6&source=gbs_api",
                    "infoLink": "http://books.google.com/books?id=EFFDAAAAIAAJ&dq=hey&hl=&source=gbs_api",
                    "canonicalVolumeLink": "https://books.google.com/books/about/Hey_Rube.html?hl=&id=EFFDAAAAIAAJ"
                },
                "saleInfo": {
                    "country": "IL",
                    "saleability": "NOT_FOR_SALE",
                    "isEbook": false
                },
                "accessInfo": {
                    "country": "IL",
                    "viewability": "NO_PAGES",
                    "embeddable": false,
                    "publicDomain": false,
                    "textToSpeechPermission": "ALLOWED",
                    "epub": {
                        "isAvailable": false
                    },
                    "pdf": {
                        "isAvailable": false
                    },
                    "webReaderLink": "http://play.google.com/books/reader?id=EFFDAAAAIAAJ&hl=&printsec=frontcover&source=gbs_api",
                    "accessViewStatus": "NONE",
                    "quoteSharingAllowed": false
                }
            },
            {
                "kind": "books#volume",
                "id": "n04TCy8kUOUC",
                "etag": "fsANYHcSoqY",
                "selfLink": "https://www.googleapis.com/books/v1/volumes/n04TCy8kUOUC",
                "volumeInfo": {
                    "title": "Hey, Peanuts!",
                    "authors": [
                        "Charles M. Schulz"
                    ],
                    "publisher": "Ballantine Books",
                    "publishedDate": "1984-09-12",
                    "industryIdentifiers": [
                        {
                            "type": "ISBN_10",
                            "identifier": "0449206971"
                        },
                        {
                            "type": "ISBN_13",
                            "identifier": "9780449206973"
                        }
                    ],
                    "readingModes": {
                        "text": false,
                        "image": false
                    },
                    "pageCount": 124,
                    "printType": "BOOK",
                    "categories": [
                        "Humor"
                    ],
                    "maturityRating": "NOT_MATURE",
                    "allowAnonLogging": false,
                    "contentVersion": "0.1.2.0.preview.0",
                    "panelizationSummary": {
                        "containsEpubBubbles": false,
                        "containsImageBubbles": false
                    },
                    "imageLinks": {
                        "smallThumbnail": "http://books.google.com/books/content?id=n04TCy8kUOUC&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                        "thumbnail": "http://books.google.com/books/content?id=n04TCy8kUOUC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    },
                    "language": "en",
                    "previewLink": "http://books.google.com/books?id=n04TCy8kUOUC&q=hey&dq=hey&hl=&cd=7&source=gbs_api",
                    "infoLink": "http://books.google.com/books?id=n04TCy8kUOUC&dq=hey&hl=&source=gbs_api",
                    "canonicalVolumeLink": "https://books.google.com/books/about/Hey_Peanuts.html?hl=&id=n04TCy8kUOUC"
                },
                "saleInfo": {
                    "country": "IL",
                    "saleability": "NOT_FOR_SALE",
                    "isEbook": false
                },
                "accessInfo": {
                    "country": "IL",
                    "viewability": "NO_PAGES",
                    "embeddable": false,
                    "publicDomain": false,
                    "textToSpeechPermission": "ALLOWED",
                    "epub": {
                        "isAvailable": false
                    },
                    "pdf": {
                        "isAvailable": false
                    },
                    "webReaderLink": "http://play.google.com/books/reader?id=n04TCy8kUOUC&hl=&printsec=frontcover&source=gbs_api",
                    "accessViewStatus": "NONE",
                    "quoteSharingAllowed": false
                }
            },
            {
                "kind": "books#volume",
                "id": "e1QhAQAAMAAJ",
                "etag": "imvdXFaiSao",
                "selfLink": "https://www.googleapis.com/books/v1/volumes/e1QhAQAAMAAJ",
                "volumeInfo": {
                    "title": "Hey! Hey! LBJ!",
                    "subtitle": "Or ... He Went Away and Left the Faucet Running",
                    "authors": [
                        "Scott Long"
                    ],
                    "publishedDate": "1969",
                    "industryIdentifiers": [
                        {
                            "type": "OTHER",
                            "identifier": "WISC:89060414281"
                        }
                    ],
                    "readingModes": {
                        "text": false,
                        "image": false
                    },
                    "pageCount": 154,
                    "printType": "BOOK",
                    "categories": [
                        "United States"
                    ],
                    "maturityRating": "NOT_MATURE",
                    "allowAnonLogging": false,
                    "contentVersion": "0.1.1.0.preview.0",
                    "panelizationSummary": {
                        "containsEpubBubbles": false,
                        "containsImageBubbles": false
                    },
                    "imageLinks": {
                        "smallThumbnail": "http://books.google.com/books/content?id=e1QhAQAAMAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                        "thumbnail": "http://books.google.com/books/content?id=e1QhAQAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    },
                    "language": "en",
                    "previewLink": "http://books.google.com/books?id=e1QhAQAAMAAJ&q=hey&dq=hey&hl=&cd=8&source=gbs_api",
                    "infoLink": "http://books.google.com/books?id=e1QhAQAAMAAJ&dq=hey&hl=&source=gbs_api",
                    "canonicalVolumeLink": "https://books.google.com/books/about/Hey_Hey_LBJ.html?hl=&id=e1QhAQAAMAAJ"
                },
                "saleInfo": {
                    "country": "IL",
                    "saleability": "NOT_FOR_SALE",
                    "isEbook": false
                },
                "accessInfo": {
                    "country": "IL",
                    "viewability": "NO_PAGES",
                    "embeddable": false,
                    "publicDomain": false,
                    "textToSpeechPermission": "ALLOWED",
                    "epub": {
                        "isAvailable": false
                    },
                    "pdf": {
                        "isAvailable": false
                    },
                    "webReaderLink": "http://play.google.com/books/reader?id=e1QhAQAAMAAJ&hl=&printsec=frontcover&source=gbs_api",
                    "accessViewStatus": "NONE",
                    "quoteSharingAllowed": false
                }
            },
            {
                "kind": "books#volume",
                "id": "uG2tR6tnXrsC",
                "etag": "NNOFTI1YD5M",
                "selfLink": "https://www.googleapis.com/books/v1/volumes/uG2tR6tnXrsC",
                "volumeInfo": {
                    "title": "Hey, Big Spender!",
                    "authors": [
                        "Frank Bonham"
                    ],
                    "publisher": "Dutton Juvenile",
                    "publishedDate": "1972",
                    "description": "Cool, a young African-American boy living in the Dogtown Project, takes a summer job delivering \"free money\" and soon finds out that free money can bring you a lot of things, especially trouble.",
                    "industryIdentifiers": [
                        {
                            "type": "ISBN_10",
                            "identifier": "0525318550"
                        },
                        {
                            "type": "ISBN_13",
                            "identifier": "9780525318552"
                        }
                    ],
                    "readingModes": {
                        "text": false,
                        "image": false
                    },
                    "pageCount": 151,
                    "printType": "BOOK",
                    "categories": [
                        "African American young men"
                    ],
                    "maturityRating": "NOT_MATURE",
                    "allowAnonLogging": false,
                    "contentVersion": "0.1.1.0.preview.0",
                    "panelizationSummary": {
                        "containsEpubBubbles": false,
                        "containsImageBubbles": false
                    },
                    "imageLinks": {
                        "smallThumbnail": "http://books.google.com/books/content?id=uG2tR6tnXrsC&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                        "thumbnail": "http://books.google.com/books/content?id=uG2tR6tnXrsC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    },
                    "language": "en",
                    "previewLink": "http://books.google.com/books?id=uG2tR6tnXrsC&q=hey&dq=hey&hl=&cd=9&source=gbs_api",
                    "infoLink": "http://books.google.com/books?id=uG2tR6tnXrsC&dq=hey&hl=&source=gbs_api",
                    "canonicalVolumeLink": "https://books.google.com/books/about/Hey_Big_Spender.html?hl=&id=uG2tR6tnXrsC"
                },
                "saleInfo": {
                    "country": "IL",
                    "saleability": "NOT_FOR_SALE",
                    "isEbook": false
                },
                "accessInfo": {
                    "country": "IL",
                    "viewability": "NO_PAGES",
                    "embeddable": false,
                    "publicDomain": false,
                    "textToSpeechPermission": "ALLOWED",
                    "epub": {
                        "isAvailable": false
                    },
                    "pdf": {
                        "isAvailable": false
                    },
                    "webReaderLink": "http://play.google.com/books/reader?id=uG2tR6tnXrsC&hl=&printsec=frontcover&source=gbs_api",
                    "accessViewStatus": "NONE",
                    "quoteSharingAllowed": false
                }
            },
            {
                "kind": "books#volume",
                "id": "LIlNcJepi1UC",
                "etag": "Mg6Dc4k3nJM",
                "selfLink": "https://www.googleapis.com/books/v1/volumes/LIlNcJepi1UC",
                "volumeInfo": {
                    "title": "Hey, Sports Fans!",
                    "subtitle": "Over 150 Silly Sports Jokes and Riddles",
                    "authors": [
                        "Michael Morgan Pellowski"
                    ],
                    "publishedDate": "1996",
                    "industryIdentifiers": [
                        {
                            "type": "ISBN_10",
                            "identifier": "0440833949"
                        },
                        {
                            "type": "ISBN_13",
                            "identifier": "9780440833949"
                        }
                    ],
                    "readingModes": {
                        "text": false,
                        "image": false
                    },
                    "pageCount": 55,
                    "printType": "BOOK",
                    "categories": [
                        "Riddles, Juvenile"
                    ],
                    "maturityRating": "NOT_MATURE",
                    "allowAnonLogging": false,
                    "contentVersion": "0.2.1.0.preview.0",
                    "panelizationSummary": {
                        "containsEpubBubbles": false,
                        "containsImageBubbles": false
                    },
                    "imageLinks": {
                        "smallThumbnail": "http://books.google.com/books/content?id=LIlNcJepi1UC&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                        "thumbnail": "http://books.google.com/books/content?id=LIlNcJepi1UC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    },
                    "language": "en",
                    "previewLink": "http://books.google.com/books?id=LIlNcJepi1UC&q=hey&dq=hey&hl=&cd=10&source=gbs_api",
                    "infoLink": "http://books.google.com/books?id=LIlNcJepi1UC&dq=hey&hl=&source=gbs_api",
                    "canonicalVolumeLink": "https://books.google.com/books/about/Hey_Sports_Fans.html?hl=&id=LIlNcJepi1UC"
                },
                "saleInfo": {
                    "country": "IL",
                    "saleability": "NOT_FOR_SALE",
                    "isEbook": false
                },
                "accessInfo": {
                    "country": "IL",
                    "viewability": "NO_PAGES",
                    "embeddable": false,
                    "publicDomain": false,
                    "textToSpeechPermission": "ALLOWED",
                    "epub": {
                        "isAvailable": false
                    },
                    "pdf": {
                        "isAvailable": false
                    },
                    "webReaderLink": "http://play.google.com/books/reader?id=LIlNcJepi1UC&hl=&printsec=frontcover&source=gbs_api",
                    "accessViewStatus": "NONE",
                    "quoteSharingAllowed": false
                }
            }
        ]
    }
    books = Promise.resolve(books).then(book => book.items)

    return (books)
}

function addGoogleBook(googleBook) {
    const book = {
        "id": googleBook.id,
        "title": googleBook.volumeInfo.title,
        "subtitle": googleBook.volumeInfo.subtitle,
        "authors": [
            googleBook.volumeInfo.authors
        ],
        "publishedDate": googleBook.volumeInfo.publishedDate,
        "description": (googleBook.volumeInfo.description) ? googleBook.volumeInfo.description : '',
        "pageCount": googleBook.volumeInfo.pageCount,
        "categories": googleBook.volumeInfo.categories.map(category => category)
        ,
        "thumbnail": googleBook.volumeInfo.imageLinks.thumbnail,
        "language": googleBook.volumeInfo.language,
        "listPrice": {
            "amount": utilService.getRandomIntInclusive(20, 200),
            "currencyCode": utilService.getRandomIntInclusive(0, 1) > 0.5 ? 'EUR' : 'USD',
            "isOnSale": utilService.getRandomIntInclusive(0, 1) > 0.5 ? false : true
        }
    }
    gBooks.unshift(book)
    _saveToStorage(gBooks)
    return Promise.resolve()
}

function getNextBookId(bookId) {
    let books = _loadFromStorage()
    const bookIdx = books.findIndex(book => book.id === bookId)
    const nextBookIdx = bookIdx + 1 === books.length ? 0 : bookIdx + 1
    console.log(nextBookIdx);
    return books[nextBookIdx].id
}


function _loadFromStorage() {
    return storageService.loadFromStorage(STORAGE_KEY)
}

function _saveToStorage(books) {
    storageService.saveToStorage(STORAGE_KEY, books)
}


