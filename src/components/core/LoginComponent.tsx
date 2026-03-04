import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { authLogin, authRegister } from '@/services/login'
import LoadingAnimation from '@/icons/LoadingAnimation'

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideLeft {
    from { opacity: 0; transform: translateX(22px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideRight {
    from { opacity: 0; transform: translateX(-22px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(124,92,191,0.35); }
    70%  { box-shadow: 0 0 0 8px rgba(124,92,191,0); }
    100% { box-shadow: 0 0 0 0 rgba(124,92,191,0); }
  }
  .card-login  { animation: slideRight .38s cubic-bezier(.22,1,.36,1) both; }
  .card-reg    { animation: slideLeft  .38s cubic-bezier(.22,1,.36,1) both; }
  .field-row   { animation: fadeUp .3s cubic-bezier(.22,1,.36,1) both; }
  .field-row:nth-child(1) { animation-delay: .04s }
  .field-row:nth-child(2) { animation-delay: .09s }
  .field-row:nth-child(3) { animation-delay: .14s }
  .field-row:nth-child(4) { animation-delay: .19s }
  .submit-btn:not(:disabled):active { transform: scale(.97); }
  .submit-btn { transition: opacity .18s, transform .12s; }
  .submit-btn:not(:disabled):hover { opacity: .88; }
  * { font-family: 'Sora', sans-serif; box-sizing: border-box; }
`

function Field({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  rightSlot,
}: {
  label: string
  type?: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  icon: React.ReactNode
  rightSlot?: React.ReactNode
}) {
  return (
    <div className="field-row mb-4">
      <label
        style={{
          display: 'block',
          fontSize: 10,
          fontWeight: 600,
          color: '#6e5fa8',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: '#f7f4ff',
          border: '1.5px solid #e5dff7',
          borderRadius: 12,
          padding: '0 14px',
          transition: 'border-color .15s, box-shadow .15s',
        }}
        onFocus={() => { }}
        className="input-wrap"
      >
        {icon}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            padding: '12px 0',
            fontSize: 14,
            color: '#1e1233',
          }}
        />
        {rightSlot}
      </div>
    </div>
  )
}

const IconEmail = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    stroke="#9b8ecb"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="M2 7l10 7 10-7" />
  </svg>
)
const IconLock = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    stroke="#9b8ecb"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)
const IconUser = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    stroke="#9b8ecb"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
)
const IconId = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    stroke="#9b8ecb"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <circle cx="8" cy="12" r="2" />
    <path d="M13 10h5M13 14h3" />
  </svg>
)
const IconEyeOff = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
)
const IconEye = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

function ErrorBanner({ msg }: { msg: string }) {
  return (
    <div
      style={{
        background: '#fff0f3',
        border: '1.5px solid #ffc2cc',
        borderRadius: 10,
        padding: '10px 14px',
        marginBottom: 16,
        fontSize: 13,
        color: '#c0183a',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <svg
        width="15"
        height="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {msg}
    </div>
  )
}

export default function Auth() {
  const [mode, setMode] = useState<'login' | 'register'>('login')

  const [lEmail, setLEmail] = useState('')
  const [lPassword, setLPassword] = useState('')
  const [lShow, setLShow] = useState(false)
  const [remember, setRemember] = useState(false)

  const [rName, setRName] = useState('')
  const [rEmail, setREmail] = useState('')
  const [rPassword, setRPassword] = useState('')
  const [rRollNo, setRRollNo] = useState('')
  const [rShow, setRShow] = useState(false)
  const [rConfirm, setRConfirm] = useState('')
  const [rConfirmShow, setRConfirmShow] = useState(false)

  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await authLogin({ email: lEmail, password: lPassword });
      return res?.data
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data?.accessToken)
      localStorage.setItem('userDetails', JSON.stringify(data?.data, null, 2))

      navigate({ to: '/dashboard' })
    },
  })

  const registerMutation = useMutation({
    mutationFn: async () => {
      const res = await authRegister({
        name: rName,
        email: rEmail,
        password: rPassword,
        rollNo: rRollNo,
      })
      return res
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data?.data.accessToken)
    },
  })

  const handleLogin = () => {
    if (!lEmail || !lPassword) return
    loginMutation.mutate()
  }

  const handleRegister = () => {
    if (!rName || !rEmail || !rPassword || !rRollNo) return
    if (rPassword !== rConfirm) return
    registerMutation.mutate()
  }

  const switchMode = (next: 'login' | 'register') => {
    setMode(next)
    loginMutation.reset()
    registerMutation.reset()
  }

  const getErrorMsg = (data: any) =>
    data?.values && data.status >= 400 ? data.values : null

  if (loginMutation.isPending || registerMutation.isPending) {
    return <LoadingAnimation />
  }

  return (
    <>
      <style>{STYLES}</style>
      <style>{`
        .input-wrap:focus-within {
          border-color: #b49fe8 !important;
          box-shadow: 0 0 0 3px rgba(180,159,232,.2);
        }
      `}</style>

      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          background:
            'linear-gradient(135deg,#f0ecff 0%,#e8e0fa 50%,#ede8ff 100%)',
        }}
      >
        <div
          key={mode}
          className={mode === 'login' ? 'card-login' : 'card-reg'}
          style={{
            background: '#fff',
            borderRadius: 22,
            padding: '40px 40px 36px',
            width: '100%',
            maxWidth: 380,
            boxShadow: '0 8px 48px rgba(120,90,200,0.13)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 22,
            }}
          >
            <span style={{ fontSize: 22, color: '#7c5cbf' }}>✦</span>
            <p
              style={{
                fontSize: 10,
                color: '#a090c8',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              {mode === 'login' ? 'Welcome back' : 'Join PathZen'}
            </p>
          </div>

          <h1
            style={{
              fontSize: 28,
              color: '#1e1233',
              margin: '0 0 24px',
              fontWeight: 300,
              letterSpacing: '-0.02em',
            }}
          >
            {mode === 'login' ? 'Sign in' : 'Create account'}
          </h1>

          {mode === 'login' && (
            <>
              {getErrorMsg(loginMutation.data) && (
                <ErrorBanner msg={getErrorMsg(loginMutation.data)} />
              )}

              <Field
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={lEmail}
                onChange={setLEmail}
                icon={<IconEmail />}
              />

              <Field
                label="Password"
                type={lShow ? 'text' : 'password'}
                placeholder="••••••••"
                value={lPassword}
                onChange={setLPassword}
                icon={<IconLock />}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setLShow((p) => !p)}
                    style={{
                      color: '#9b8ecb',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      padding: 0,
                    }}
                  >
                    {lShow ? <IconEyeOff /> : <IconEye />}
                  </button>
                }
              />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '4px 0 22px',
                }}
              >
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    cursor: 'pointer',
                    userSelect: 'none',
                    fontSize: 13,
                    color: '#5a4d80',
                  }}
                  onClick={() => setRemember((r) => !r)}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 5,
                      border: `1.8px solid ${remember ? '#7c5cbf' : '#c5bce8'}`,
                      background: remember ? '#7c5cbf' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all .15s',
                      flexShrink: 0,
                    }}
                  >
                    {remember && (
                      <svg
                        width="10"
                        height="10"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  Remember me
                </label>
                <a
                  href="#"
                  style={{
                    fontSize: 12,
                    color: '#7c5cbf',
                    fontWeight: 500,
                    textDecoration: 'none',
                  }}
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="button"
                onClick={handleLogin}
                disabled={loginMutation.isPending}
                className="submit-btn"
                style={{
                  width: '100%',
                  padding: '13px 0',
                  borderRadius: 12,
                  border: 'none',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: '0.03em',
                  background: 'linear-gradient(90deg,#7c5cbf,#9b72e8)',
                  boxShadow: '0 4px 18px rgba(124,92,191,.3)',
                  cursor: loginMutation.isPending ? 'not-allowed' : 'pointer',
                  opacity: loginMutation.isPending ? 0.6 : 1,
                }}
              >
                {loginMutation.isPending ? 'Signing in…' : 'Sign in →'}
              </button>

              <p
                style={{
                  textAlign: 'center',
                  marginTop: 20,
                  fontSize: 13,
                  color: '#9b8ecb',
                }}
              >
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('register')}
                  style={{
                    color: '#7c5cbf',
                    fontWeight: 600,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 13,
                    padding: 0,
                  }}
                >
                  Create one
                </button>
              </p>
            </>
          )}

          {/* ── REGISTER FORM ── */}
          {mode === 'register' && (
            <>
              {getErrorMsg(registerMutation.data) && (
                <ErrorBanner msg={getErrorMsg(registerMutation.data)} />
              )}
              {rPassword && rConfirm && rPassword !== rConfirm && (
                <ErrorBanner msg="Passwords do not match" />
              )}

              <Field
                label="Full Name"
                placeholder="Your full name"
                value={rName}
                onChange={setRName}
                icon={<IconUser />}
              />

              <Field
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={rEmail}
                onChange={setREmail}
                icon={<IconEmail />}
              />

              <Field
                label="Roll Number"
                placeholder="e.g. 21481A05L1"
                value={rRollNo}
                onChange={setRRollNo}
                icon={<IconId />}
              />

              <Field
                label="Password"
                type={rShow ? 'text' : 'password'}
                placeholder="Create a password"
                value={rPassword}
                onChange={setRPassword}
                icon={<IconLock />}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setRShow((p) => !p)}
                    style={{
                      color: '#9b8ecb',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      padding: 0,
                    }}
                  >
                    {rShow ? <IconEyeOff /> : <IconEye />}
                  </button>
                }
              />

              <Field
                label="Confirm Password"
                type={rConfirmShow ? 'text' : 'password'}
                placeholder="Repeat your password"
                value={rConfirm}
                onChange={setRConfirm}
                icon={<IconLock />}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setRConfirmShow((p) => !p)}
                    style={{
                      color: '#9b8ecb',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      padding: 0,
                    }}
                  >
                    {rConfirmShow ? <IconEyeOff /> : <IconEye />}
                  </button>
                }
              />

              <button
                type="button"
                onClick={handleRegister}
                disabled={
                  registerMutation.isPending ||
                  !!(rPassword && rConfirm && rPassword !== rConfirm)
                }
                className="submit-btn"
                style={{
                  width: '100%',
                  padding: '13px 0',
                  borderRadius: 12,
                  border: 'none',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: '0.03em',
                  marginTop: 4,
                  background: 'linear-gradient(90deg,#7c5cbf,#9b72e8)',
                  boxShadow: '0 4px 18px rgba(124,92,191,.3)',
                  cursor: registerMutation.isPending
                    ? 'not-allowed'
                    : 'pointer',
                  opacity: registerMutation.isPending ? 0.6 : 1,
                }}
              >
                {registerMutation.isPending
                  ? 'Creating account…'
                  : 'Create account →'}
              </button>

              <p
                style={{
                  textAlign: 'center',
                  marginTop: 20,
                  fontSize: 13,
                  color: '#9b8ecb',
                }}
              >
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  style={{
                    color: '#7c5cbf',
                    fontWeight: 600,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 13,
                    padding: 0,
                  }}
                >
                  Sign in
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  )
}
