// 타이포그래피 규칙 (커서 룰 기반)
export const typography = {
  title: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    color: '#262626',
  },
  body: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: '#262626',
  },
  caption: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    color: '#8E8E8E',
  },
  button: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: '#262626',
  },
  headingMedium: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    color: '#262626',
  },
  bodyRegular: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    color: '#262626',
  },
  captionSmall: {
    fontFamily: 'Pretendard-Light',
    fontSize: 12,
    color: '#8E8E8E',
  },
  hashtag: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    color: '#3897F0',
  },
};

export type TypographyKey = keyof typeof typography; 