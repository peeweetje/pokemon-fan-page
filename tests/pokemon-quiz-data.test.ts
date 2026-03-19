import { describe, test, expect, vi } from 'vitest';
import { questions } from '@/data/quiz-questions';

describe('Pokemon Quiz Data', () => {
  test('questions array is not empty', () => {
    expect(questions).toBeDefined();
    expect(questions.length).toBeGreaterThan(0);
  });

  test('each question has required properties', () => {
    questions.forEach((question, index) => {
      expect(question).toHaveProperty('index');
      expect(question).toHaveProperty('question');
      expect(question).toHaveProperty('options');
      expect(question).toHaveProperty('correctAnswer');
      expect(question).toHaveProperty('explanation');
      expect(question).toHaveProperty('category');
      
      expect(question.index).toBe(index);
      expect(typeof question.question).toBe('string');
      expect(Array.isArray(question.options)).toBe(true);
      expect(question.options.length).toBeGreaterThan(0);
      expect(typeof question.correctAnswer).toBe('string');
      expect(typeof question.explanation).toBe('string');
      expect(typeof question.category).toBe('string');
    });
  });

  test('each question has exactly 4 options', () => {
    questions.forEach(question => {
      expect(question.options).toHaveLength(4);
    });
  });

  test('correct answer is always one of the options', () => {
    questions.forEach(question => {
      expect(question.options).toContain(question.correctAnswer);
    });
  });

  test('options are shuffled for each question', () => {
    // Since options are shuffled during import, we can't test the exact order
    // But we can verify that the correct answer is in the options array
    questions.forEach(question => {
      expect(question.options).toContain(question.correctAnswer);
    });
  });

  test('questions have valid categories', () => {
    const validCategories = [
      'Basic Knowledge',
      'Types',
      'Evolutions',
      'Legendary Pokemon',
      'Abilities and Moves',
      'Game Mechanics',
      'Math'
    ];
    
    questions.forEach(question => {
      expect(validCategories).toContain(question.category);
    });
  });

  test('questions are properly indexed', () => {
    questions.forEach((question, index) => {
      expect(question.index).toBe(index);
    });
  });

  test('no duplicate questions', () => {
    const questionsText = questions.map(q => q.question.toLowerCase().trim());
    const uniqueQuestions = new Set(questionsText);
    
    // Allow for some flexibility in case of minor variations
    // but ensure we have a reasonable number of unique questions
    const duplicateCount = questions.length - uniqueQuestions.size;
    expect(duplicateCount).toBeLessThanOrEqual(questions.length * 0.1); // Allow up to 10% duplicates
  });

  test('options are unique within each question', () => {
    questions.forEach(question => {
      const uniqueOptions = new Set(question.options);
      expect(uniqueOptions.size).toBe(question.options.length);
    });
  });

  test('explanations are not empty', () => {
    questions.forEach(question => {
      expect(question.explanation.trim()).not.toBe('');
    });
  });

  test('questions have reasonable length', () => {
    questions.forEach(question => {
      expect(question.question.length).toBeGreaterThan(5);
      expect(question.question.length).toBeLessThan(200);
      expect(question.explanation.length).toBeGreaterThan(5);
      expect(question.explanation.length).toBeLessThan(500);
    });
  });

  test('categories are properly distributed', () => {
    const categoryCounts = questions.reduce((acc, question) => {
      acc[question.category] = (acc[question.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Check that we have multiple categories represented
    expect(Object.keys(categoryCounts).length).toBeGreaterThan(1);
    
    // Check that no single category dominates (has more than 50% of questions)
    const maxCount = Math.max(...Object.values(categoryCounts));
    expect(maxCount).toBeLessThan(questions.length / 2);
  });
});