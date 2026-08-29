export interface VerificationOutcome {
  state: 'granted' | 'denied'
  title: string
  detail: string
  checks: string[]
}

interface VerificationResultProps {
  outcome: VerificationOutcome
}

function VerificationResult({ outcome }: VerificationResultProps) {
  const isGranted = outcome.state === 'granted'

  return (
    <div className={`verification-result ${isGranted ? 'granted' : 'denied'}`}>
      <div className="verification-icon" aria-hidden="true">
        {isGranted ? '🟢' : '🔴'}
      </div>
      <div className="verification-copy">
        <h3>{outcome.title}</h3>
        <p>{outcome.detail}</p>
      </div>
      <ul className="verification-checks">
        {outcome.checks.map((item) => (
          <li key={item}>✓ {item}</li>
        ))}
      </ul>
    </div>
  )
}

export default VerificationResult
