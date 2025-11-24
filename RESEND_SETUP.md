# Konfiguracja wysyłania emaili przez Resend

## Instrukcja krok po kroku

### 1. Rejestracja w Resend (darmowe 3000 emaili/miesiąc)
- Przejdź na https://resend.com
- Zarejestruj się (można przez GitHub)
- W panelu przejdź do sekcji "API Keys"
- Stwórz nowy API Key i skopiuj go

### 2. Konfiguracja zmiennych środowiskowych
Stwórz plik `.env.local` w głównym katalogu projektu z następującą zawartością:

```env
# API Key z Resend (wymagane)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx

# Email z którego będą wysyłane wiadomości
# W darmowym planie możesz używać dowolnego adresu @resend.dev
# Np. formularz.projektowy@resend.dev (domyślny) lub onboarding@resend.dev
# Lub zarejestruj własną domenę w panelu Resend
RESEND_FROM_EMAIL=formularz.projektowy@resend.dev

# Email na który będą przychodzić formularze (Twój adres email)
RECIPIENT_EMAIL=kontakt.kreujemy@gmail.com
```

### 3. Uwagi
- W darmowym planie Resend możesz używać dowolnego adresu kończącego się na `@resend.dev`
- Domyślny adres to `formularz.projektowy@resend.dev` (możesz zmienić na dowolny inny)
- Jeśli chcesz użyć własnej domeny, musisz ją zweryfikować w panelu Resend
- Plik `.env.local` jest automatycznie ignorowany przez git (bezpieczeństwo)
- Po dodaniu zmiennych środowiskowych, zrestartuj serwer deweloperski (`npm run dev`)

### 4. Weryfikacja
Po skonfigurowaniu, wyślij formularz testowy. Powinieneś otrzymać email z danymi formularza i załącznikami.

