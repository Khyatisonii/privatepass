import { useState } from 'react'
import VerificationResult, {
  type VerificationOutcome,
} from '../components/VerificationResult'

interface GateScreenProps {
  onVerifyTicket: () => Promise<VerificationOutcome>
  onBack: () => void
}

const loadingSteps = [
  'Checking ticket proof...',
  'Verifying event access...',
  'Checking ticket usage...',
]

function GateScreen({ onVerifyTicket, onBack }: GateScreenProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [result, setResult] = useState<VerificationOutcome | null>(null)

  const runVerification = async () => {
    setResult(null)
    setIsLoading(true)
    setLoadingStep(0)

    for (let index = 0; index < loadingSteps.length; index += 1) {
      setLoadingStep(index)
      await new Promise((resolve) => setTimeout(resolve, 650))
    }

    const nextResult = await onVerifyTicket()
    setResult(nextResult)
    setIsLoading(false)
  }

  return (
    <div className="screen gate-screen">
      <header className="gate-header">
        <button type="button" className="back-button light" onClick={onBack}>
          ← Back
        </button>
      </header>

      <main className="gate-content">
        <div className="gate-intro">
          <p className="eyebrow">PrivatePass Verify</p>
          <h2>Verify access without seeing personal data.</h2>
        </div>

        <div className="scanner-frame">
          <div className="scanner-surface">
            <div className="scanner-line" aria-hidden="true" />
            <div className="scanner-glow" aria-hidden="true" />
            <div className="scan-label">Scan area</div>
          </div>
        </div>

        {isLoading ? (
          <div className="loading-state" aria-live="polite">
            <div className="pulse-dot" aria-hidden="true" />
            <p>{loadingSteps[loadingStep]}</p>
          </div>
        ) : result ? (
          <VerificationResult outcome={result} />
        ) : null}

        {!isLoading && (
          <button type="button" className="primary-button" onClick={runVerification}>
            {result ? 'Verify Again' : 'Verify Demo Ticket'}
          </button>
        )}
      </main>
    </div>
  )
}

export default GateScreen
