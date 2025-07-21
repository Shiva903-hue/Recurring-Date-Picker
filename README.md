# Recurring Date Picker 📅

A simple and clean React component for picking recurring dates. Perfect for scheduling events, appointments, or any recurring tasks.

## What does it do?

This component lets users easily select dates that repeat on a schedule - like "every Monday" or "every 2 weeks" or "monthly on the 15th". It's built with React and Vite, so it's fast and modern.

## Features

- ✅ Daily, weekly, monthly, and yearly patterns
- ✅ Custom intervals (every 2 days, every 3 weeks, etc.)
- ✅ Pick specific weekdays for weekly events
- ✅ Choose specific dates for monthly events
- ✅ Clean, responsive design
- ✅ Easy to customize

## Quick Start

### Installation

```bash
git clone https://github.com/Shiva903-hue/Recurring-Date-Picker.git
cd Recurring-Date-Picker
npm install
npm run dev
```

That's it! Open `http://localhost:5173` and you'll see it running.

## How to use it

### Basic usage

```jsx
import RecurringDatePicker from './components/RecurringDatePicker';

function MyApp() {
  const handleDateSelection = (pattern) => {
    console.log('User selected:', pattern);
    // Do something with the recurring pattern
  };

  return (
    <RecurringDatePicker 
      onDateChange={handleDateSelection}
    />
  );
}
```

### What you get back

When someone picks a recurring pattern, you'll get an object like this:

```javascript
{
  type: 'weekly',           // daily, weekly, monthly, or yearly
  startDate: '2024-01-15',  // when it starts
  endDate: '2024-12-31',    // when it ends (or null for no end)
  interval: 2,              // every 2 weeks
  weekdays: [1, 3, 5]      // Monday, Wednesday, Friday
}
```

## Available props

| Prop | What it does | Default |
|------|--------------|---------|
| `onDateChange` | Function called when user selects a pattern | Required |
| `initialDate` | Starting date | Today's date |
| `minDate` | Earliest selectable date | No limit |
| `maxDate` | Latest selectable date | No limit |

## Examples

### Weekly team meeting (every Tuesday)
```jsx
<RecurringDatePicker 
  onDateChange={(pattern) => {
    // pattern.type will be 'weekly'
    // pattern.weekdays will be [2] (Tuesday)
  }}
/>
```

### Monthly report (15th of every month)
```jsx
<RecurringDatePicker 
  initialDate={new Date(2024, 0, 15)} // January 15th
  onDateChange={(pattern) => {
    // pattern.type will be 'monthly'
    // pattern.monthDay will be 15
  }}
/>
```

## Development

Want to contribute or modify the code?

```bash
npm run dev      # Start development server
npm run build    # Build for production  
npm run lint     # Check code quality
```

## Project structure

```
src/
├── components/           # All React components
│   ├── RecurringDatePicker.jsx
│   └── ...
├── styles/              # CSS files
├── App.jsx             # Main app
└── main.jsx           # Entry point
```

## Customizing the look

The component uses CSS variables, so you can easily change colors:

```css
:root {
  --primary-color: #your-brand-color;
  --background-color: #your-background;
}
```

## Common issues

**Date not updating?** Make sure you're passing a valid Date object.

**Styling looks weird?** Check if your CSS is conflicting with the component's styles.

**Need help?** Open an issue on GitHub and I'll help you out!

## Contributing

Found a bug? Want to add a feature? Here's how:

1. Fork this repo
2. Create a branch: `git checkout -b my-cool-feature`
3. Make your changes
4. Push and create a Pull Request

I review PRs quickly and appreciate any contributions!

## License

MIT License - feel free to use this in your projects.

---

Made with ❤️ by [Shiva903-hue](https://github.com/Shiva903-hue)

*If this helped you, give it a ⭐ on GitHub!*
