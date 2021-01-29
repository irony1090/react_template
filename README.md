# Next.js with TypeScript

# Commit Template
``` 
type: subject  
body  
footer
```
---
# Commit Type
- feat: 새로운 기능 추가
- fix: 버그 수정
- docs: 문서 수정
- style: 코드포맷팅, 세미콜론 누락, 코드변경이 없는 경우
- refactor: 코드 리펙토링
- test: 테스트 코드, 리펙토링 테스트 코드추가
- chore: 빌드 업무 수정, 패키지 매니저 수정
# Body
- 선택사항이기에 모든 커밋에 본문내용을 작성할 필요 없다
- 부연설명이 필요하거나 커밋의 이유를  설명할 경우 작성
- 72자를 넘기지 않고 제목과 구분되기 위해 한칸을 띄워 작성
# Footer
- 선택사항이기에 모든 커밋에 꼬리말을 작성할 필요는 없다
- issue tracker id를 작성할 때 사용

# Example
```
feat: Summarize changes in around 50 characters or less

More detailed explanatory text, if necessary. Wrap it to about 72
characters or so. In some contexts, the first line is treated as the
subject of the commit and the rest of the text as the body. The
blank line separating the summary from the body is critical (unless
you omit the body entirely); various tools like `log`, `shortlog`
and `rebase` can get confused if you run the two together.

Explain the problem that this commit is solving. Focus on why you
are making this change as opposed to how (the code explains that).
Are there side effects or other unintuitive consequenses of this
change? Here's the place to explain them.

Further paragraphs come after blank lines.

 - Bullet points are okay, too

 - Typically a hyphen or asterisk is used for the bullet, preceded
   by a single space, with blank lines in between, but conventions
   vary here

If you use an issue tracker, put references to them at the bottom,
like this:

Resolves: #123
See also: #456, #789
```
---
## How to use

Download the example [or clone the repo](https://github.com/mui-org/material-ui):

```sh
curl https://codeload.github.com/mui-org/material-ui/tar.gz/master | tar -xz --strip=2  material-ui-master/examples/nextjs-with-typescript
cd nextjs-with-typescript
```

Install it and run:

```sh
npm install
npm run dev
```

or:

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/mui-org/material-ui/tree/master/examples/nextjs-with-typescript)

## The idea behind the example

[Next.js](https://github.com/zeit/next.js) is a framework for server-rendered React apps.


## ENV
<!-- 환경은 localhost, production 두가지이다. (기본 개발 환경은 localhost)  
env.local 파일이 베이스로 production 환경으로 실행하면 env.local -> env.production 순서로 환경변수를 불러들인다.
- NEXT_PUBLIC_ACTIVE - 서비스 환경(env 파일 선택)
- NEXT_PUBLIC_API_URL - API 경로 EX) http://localhost:3100
- NEXT_PUBLIC_SESSION_NAME - 세션키 이름
- NEXT_PUBLIC_STORAGE - 파일 저장 위치(url)
- NEXT_PUBLIC_API_FILE_UPDLOAD_URL - 파일 업로드 API 주소 -->