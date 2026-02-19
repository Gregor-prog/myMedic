# Download all 30 Stitch screen HTML files

$screens = @(
    @{ name = "01-mymedic-secure-login"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzlkM2NmYTA4NWQ3MTQyNDViOGMwNTJkOTdjMGVhMjQ0EgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "02-medical-records-vault"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzY4OTk0YTlkNjNhMzQyMDI5MjE1MzYyODAxNDc5MWYxEgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "03-booking-success-confirmation"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2YyYjcwY2Q3MzUwODRjOWFhYWNmNTk0YTgzNWFmYTE2EgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "04-appointment-booking-calendar"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzFiMWE4ODQ5NWJkYTQwNWVhOWE4Y2Q1OWE1NzhhMzcwEgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "05-doctor-professional-dashboard"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2Y5MzAwNmMwNDYyOTQ4ZGJhNzk0MzA3NzAyYzc0MzM3EgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "06-patient-registration-step1"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzlkNjQxYjk2NDAwYjQ3NTRhNmIwYjkyYzY4NjcwY2JmEgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "07-patient-settings-notifications"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzYzMjZiZGY5NjY3YzQ5YjlhMzk0YzkxNjNlNTNiMzY2EgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "08-patient-secure-verification-kyc"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzg3ZDIxOTk5NTE5ZjQ2YTM4NWYyMWU2MWNkMDlmYzJhEgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "09-mymedic-splash-screen"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzlmNjBlYTkwOGE0NjQ0NmY4OGM2MGIxOWZmNDhiMmQxEgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "10-secure-otp-verification"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzZlZDA5Yzc3MzljMTQ2NmRhYTQ2MjczNDA4NzExMDlmEgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "11-encrypted-chat-room"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzMxMTNhYmZhNGI2NjQyZWVhZDc5ZTllMzM0ZTM2ODhjEgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "12-medical-marketplace"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2VjZTIwNTRhZTY2NTQ1ZTBhMmJkZDgzYmNkYTRhMzA1EgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "13-professional-profile-setup-step3"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2M5YmI1NjdhNDQyYjRkNGFhNDQ0Y2FkMTJkZTU5YjFmEgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "14-professional-weekly-schedule"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2Y4ZTVmYjQ0ZjA0MTRiMTY4MDg0MTRlZDQ0MGVkYmQzEgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "15-patient-dashboard"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzc3Yjc3ZTU5Njk5NTQzNWNiMjc5MDc3MmIxZGU3NTBjEgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "16-secure-chat-list"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2ZlOGRjYTgwNWZhZTQ2ZGFiOTA4Y2Q3N2ZkZTRkNjhlEgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "17-mymedic-role-selection"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzg0MTk0MmQzMzAwODQ2ZGU4ZDkzNTRhOWE1MzJkMDQyEgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "18-professional-patient-detail-timeline"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzdmODljNDE0NmY0NjQwOTFiNjhhYzExZWM2OTdkOTM1EgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "19-professional-profile-availability"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzY2NDhjZThlZGYzYTQ2Yjc4N2E5NTQwMTJiMmUyNTJlEgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "20-doctor-profile-detail"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzE2MWQyNWZiNTg1MDQwYThhNzg3MjljNDZjYjdjMjZlEgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "21-professional-registration-step1"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzI4OTE1ZDg0NjcxYTRjZmViN2QzZmNiNjJkMzc3MGEyEgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "22-professional-prescription-management"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzM2ZTA4MzE0ZWMwZjRiNDliZTA3MWEzNGU1NTM4NTJhEgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "23-professional-verification-step2"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAxNDgzYmIzYjY4MjQyZmQ5ZmMzMTk2NmM1MGVmMGFmEgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "24-booking-payment-confirmation"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2NjZTlhMGJhZTdiNTQ5MzVhYjdlNTdjNDcxZDJjMzI0EgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "25-professional-earnings-invoices"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2NkZDRlMjUxZWM4NTQ1ZTA4ZmY1MTI4ZmZkNmNiNjM4EgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "26-professional-profile-patient-view"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzNhZGM4ZmQzNWM2ZTQ2MWE4MGEzNjNhOGZiYWVlYWFlEgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "27-professional-patient-list"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2U3NzYwYTkzOTY4MTRiYzZiYTEyMTRmMTFmMTlmOThjEgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "28-secure-chat-directory"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzM2OTNmMjgwNjkxNDQ5M2Y5NTI3ZWI3ZDI0ZDFjYzlhEgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "29-professional-weekly-schedule-v2"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2M0OWY1MWVjNDg0MjRiYmE4ZDQ5MTZkYjI5NGQ2ZmQwEgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" },
    @{ name = "30-professional-patient-list-v2"; url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2I2OGFjYTc5NDNiZjQ4NWI4YTQ1NjY1MDg5NTM2YWE0EgsSBxDuy7yZsg0YAZIBIwoKcHJvamVjdF9pZBIVQhMyNjA0MDI0MjAyODQxNzk0OTI2&filename=&opi=89354086" }
)

$outputDir = "C:\Users\PARAKLETUS HUB\.gemini\antigravity\scratch\mymedic-frontend\screens"

$count = 0
foreach ($screen in $screens) {
    $count++
    $outFile = Join-Path $outputDir "$($screen.name).html"
    Write-Host "[$count/30] Downloading $($screen.name)..."
    try {
        curl.exe -L -s -o "$outFile" "$($screen.url)"
        if (Test-Path $outFile) {
            $size = (Get-Item $outFile).Length
            Write-Host "  -> Saved ($size bytes)"
        } else {
            Write-Host "  -> FAILED to save"
        }
    } catch {
        Write-Host "  -> ERROR: $_"
    }
}

Write-Host "`nDone! Downloaded $count screen HTML files."
