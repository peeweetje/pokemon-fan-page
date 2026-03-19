# Pokemon Quiz Tests

This directory contains comprehensive test suites for the Pokemon Quiz functionality.

## Test Files

### 1. `pokemon-quiz.test.tsx`
Main integration tests for the Pokemon Quiz page component. Tests include:
- Initial state and loading behavior
- Question display and navigation
- Answer selection and feedback
- Score tracking and updates
- Next question navigation
- Quiz completion and dialog display
- Accessibility features
- Error handling

### 2. `pokemon-quiz-components.test.tsx`
Unit tests for individual quiz components:
- `PokemonQuizQuestionCard` - Main question container
- `PokemonQuizOptions` - Answer selection buttons
- `PokemonQuizExplanation` - Feedback display
- `PokemonQuizImage` - Pokemon image display
- `QuizProgress` - Progress bar and score display
- `QuizDialog` - Completion dialog

### 3. `pokemon-quiz-data.test.ts`
Data validation tests for the quiz questions:
- Question structure validation
- Option count verification
- Correct answer validation
- Category validation
- Data integrity checks
- Content quality checks

## Test Coverage

The test suite covers:

### Functional Testing
- ✅ Quiz initialization and loading
- ✅ Question randomization
- ✅ Answer selection and validation
- ✅ Score calculation and display
- ✅ Progress tracking
- ✅ Navigation between questions
- ✅ Quiz completion flow
- ✅ Reset functionality

### Component Testing
- ✅ Individual component rendering
- ✅ Component props handling
- ✅ Component state management
- ✅ Component interactions
- ✅ Component accessibility

### Data Testing
- ✅ Question data structure
- ✅ Option validation
- ✅ Answer correctness
- ✅ Category distribution
- ✅ Content quality

### User Experience Testing
- ✅ Loading states
- ✅ Error states
- ✅ Success states
- ✅ Feedback display
- ✅ Accessibility compliance

## Test Patterns

The tests follow these patterns:
- Mock external dependencies (API calls, images, etc.)
- Use `@testing-library/react` for component testing
- Use `vitest` for test framework
- Mock `framer-motion` for animation testing
- Mock `lucide-react` icons
- Mock Next.js components where needed

## Running Tests

```bash
# Run all quiz tests
pnpm test -- tests/pokemon-quiz*

# Run specific test file
pnpm test -- tests/pokemon-quiz.test.tsx

# Run with UI
pnpm run test:ui

# Run with coverage
pnpm run test:coverage
```

## Test Data

The tests use mock data to ensure predictable behavior:
- Mock questions with simple math problems
- Controlled randomization for consistent testing
- Predefined correct answers and explanations

## Mocking Strategy

- **Data**: Mock `@/data/quiz-questions` with predictable test data
- **Components**: Mock UI components that aren't being tested
- **Libraries**: Mock `framer-motion`, `lucide-react`, and other external libraries
- **APIs**: Mock any external API calls or data fetching

## Test Quality

The tests are designed to be:
- **Reliable**: Use predictable mock data
- **Fast**: Minimal external dependencies
- **Maintainable**: Clear structure and naming
- **Comprehensive**: Cover all major functionality
- **Accessible**: Test keyboard navigation and screen reader support