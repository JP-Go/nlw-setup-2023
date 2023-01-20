export function generateProgressBarPercentage(completed: number, total: number) {
	return total === 0 ? 0 : Math.round(completed / total * 100)
}
