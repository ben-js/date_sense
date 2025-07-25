import { ScoreInput, BodyType } from '../../types/score';
import { MALE_HEIGHT_SCORE_RANGES, FEMALE_HEIGHT_SCORE_RANGES, APPEARANCE_WEIGHT } from './scoreMappings';
import { getScoreByRange } from './utils';
import { getBodyTypeScore, MALE_AGE_SCORE_RANGES, FEMALE_AGE_SCORE_RANGES } from './scoreMappings';

/**
 * 성별과 키를 받아 키 점수를 반환
 */
function getHeightScore(gender: string, height: number): number {
  const ranges = gender === 'male' ? MALE_HEIGHT_SCORE_RANGES : FEMALE_HEIGHT_SCORE_RANGES;
  return getScoreByRange(height, ranges);
}

/**
 * 성별과 나이를 받아 나이 점수를 반환
 */
function getAgeScore(gender: string, age: number): number {
  const ranges = gender === 'male' ? MALE_AGE_SCORE_RANGES : FEMALE_AGE_SCORE_RANGES;
  return getScoreByRange(age, ranges);
}

/**
 * 외모 점수 계산 (얼굴, 키, 바디타입, 나이)
 * @param input ScoreInput
 * @returns number (0~100)
 */
export function calculateAppearanceScore(input: ScoreInput): number {
  const face = input.faceScore; // 0~100, 매니저 평가
  const height = getHeightScore(input.gender, input.height);
  const body = getBodyTypeScore(input.bodyType);
  const age = getAgeScore(input.gender, input.age);
  // 가중치 적용
  return (
    face * APPEARANCE_WEIGHT.face +
    height * APPEARANCE_WEIGHT.height +
    body * APPEARANCE_WEIGHT.body +
    age * APPEARANCE_WEIGHT.age
  );
} 