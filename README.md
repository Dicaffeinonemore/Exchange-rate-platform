# Exchange Diary v0.1

환율을 중심으로 해외 생활의 숫자를 기록하는 다이어리형 풀스택 프로젝트입니다.

## 구성

- `frontend`: Vite + React + React Router
- `backend`: Flask API
- 현재 환율 데이터는 MVP용 데모 값(`1 USD = 1,380 KRW`)입니다.

## 실행

이 저장소에는 프로젝트 내부에서만 사용하는 포터블 Node.js와 Python을 둘 수 있습니다.
포터블 런타임이 준비된 환경에서는 루트 폴더에서 다음 명령만 실행하면 됩니다.

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File .\start.ps1
```

`start.ps1`은 Flask API와 Vite 개발 서버를 함께 실행합니다. 종료하려면 `Ctrl+C`를 누릅니다.

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

브라우저에서 `http://localhost:5173`을 엽니다.

### Backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

API 확인: `http://localhost:5000/api/exchange`

## 다음 단계

실제 환율 API 연동, 환율 그래프, 쇼핑 가격 비교, 여행 경비, 해외주식 환차익, 로그인과 MY DIARY를 순서대로 확장합니다.
