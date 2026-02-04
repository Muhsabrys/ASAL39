# 39th Annual Symposium on Arabic Linguistics (ASAL 39)

Official website for the 39th Annual Symposium on Arabic Linguistics, hosted by Indiana University Bloomington, March 27-29, 2026.

## About the Conference

The Annual Symposium on Arabic Linguistics brings together researchers, scholars, and students to share cutting-edge research in all areas of Arabic linguistics, including phonetics, phonology, morphology, syntax, semantics, pragmatics, sociolinguistics, psycholinguistics, and computational linguistics.

**Conference Dates:** March 27-29, 2026  
**Location:** Indiana University Bloomington

## In Memoriam

This conference honors the legacy of the late Professor Salman Al-Ani (1935-2024) for his outstanding contributions to the field of Arabic Linguistics.

## Website Structure

- `index.html` - Main homepage with conference information
- `registration.html` - Registration form for attendees
- `program.html` - Interactive conference program schedule
- `styles.css` - Professional academic styling
- `script.js` - Interactive functionality
- `program-data.json` - Conference program data (easily updatable)

## How to Update the Program

The conference program is stored in `program-data.json` and can be easily updated. The file is structured by day (friday, saturday, sunday) with each day containing sessions.

### Session Structure

Each session should have:
- `time` - Session time (e.g., "9:00 AM - 10:30 AM")
- `type` - Session type (e.g., "Keynote", "Session", "Break", "Poster Session")
- `title` - Session title
- `chair` - Session chair name (optional)
- `presentations` - Array of presentations (optional)

### Presentation Structure

Each presentation should have:
- `title` - Paper/poster title
- `authors` - Author name(s)
- `affiliation` - Institution/affiliation
- `abstract` - Abstract text

### Example

```json
{
  "time": "11:00 AM - 12:30 PM",
  "type": "Session",
  "title": "Phonology and Phonetics",
  "chair": "Dr. Jane Smith",
  "presentations": [
    {
      "title": "Vowel Harmony in Arabic Dialects",
      "authors": "John Doe, Jane Smith",
      "affiliation": "University Example",
      "abstract": "This paper examines vowel harmony patterns..."
    }
  ]
}
```

## Alternative Data Formats

If you prefer to use CSV format instead of JSON, you can convert your data and modify the JavaScript to parse CSV. The current structure supports:

- **JSON** (current) - Easy to read and edit, supports nested structure
- **CSV** - Can be exported from spreadsheet software
- **Other formats** - Contact the organizing committee

## Running the Website

### Simple Method (Local)
1. Open `index.html` in a web browser
2. Navigate through the pages using the navigation menu

### Using a Local Server (Recommended)
Since the program page loads data from JSON, it's best to use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
npx http-server
```

Then open `http://localhost:8000` in your browser.

## Features

### Registration Page
- Comprehensive registration form
- Multiple attendee types (Faculty, Graduate Student, etc.)
- Participation options (Presenting, Attending only)
- Dietary requirements and special accommodations
- Day selection
- Form validation

### Program Page
- Interactive day navigation (tabs)
- Session times and locations
- Paper titles and authors
- Clickable presentations showing abstracts in modal
- Responsive design for mobile devices

### Homepage
- Conference information
- Tribute to Professor Salman Al-Ani
- Keynote speakers
- Organizing committee
- Sponsors
- Call-to-action buttons

## Organizing Committee

- Stuart Davis
- Asaad Alsaleh
- Attia Youseif
- Samson Lotven
- Kevin Meskill
- Muhammad S. Abdo

## Sponsors

- Department of Middle Eastern Languages and Cultures
- Arabic Linguistics Society
- IU Conference Grant
- MELC Club
- Department of Second Language Studies
- Department of Linguistics
- Department of Religious Studies
- College Arts & Humanities Institute (CAHI)

## Contact

For inquiries, please contact: asal39@iu.edu
