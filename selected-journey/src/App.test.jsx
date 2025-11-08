import { describe, expect, it } from 'vitest'
import { eventHint } from './App'

describe('eventHint', () => {
  it('returns shortlist event for shortlist phase', () => {
    expect(eventHint({ phase: 'sl' })).toBe('shortlist.dropped')
  })

  it('includes timer events for p1 steps with 24h badge', () => {
    expect(eventHint({ phase: 'p1', badge: '24h' })).toBe('timer.started (24h), timer.expiring')
  })

  it('returns application submitted for p1 without badge', () => {
    expect(eventHint({ phase: 'p1', badge: undefined })).toBe('application.submitted')
  })

  it('returns offer accepted event when label mentions accept', () => {
    expect(eventHint({ phase: 'off', label: 'Accept Offer' })).toBe('offer.accepted → match.committed')
  })

  it('returns offer sent for offer phase without accept', () => {
    expect(eventHint({ phase: 'off', label: 'Send Offer' })).toBe('offer.sent')
  })

  it('returns default placeholder for unknown phases', () => {
    expect(eventHint({ phase: 'unknown' })).toBe('—')
  })
})
