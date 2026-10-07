# Screenshots

The README points to the images in this folder.

## Already taken

These come from the app itself, in sample mode, at phone width (390px):

| File | Shows |
| --- | --- |
| `app-home.png` | Home: the sample-mode note, the setup screen naming the 2 missing env variables, and the Your app starts here placeholder |
| `app-example.png` | The example list with its 3 neutral rows, and the form to add one |
| `app-example-edit.png` | One example row open to edit, with its status and the delete button |
| `app-setup-screen.png` | The sign-in screen before Supabase is connected: names the 2 missing env variables |

To retake them, run `npm run build` and `npm run start` with no env variables, then screenshot each screen at 390px wide.

## Still needed

These need a real GitHub, Supabase, Google Cloud or Vercel account, so they're placeholders for now. Take each one at desktop width. Crop to the part that matters, and blur any key or secret.

| File | README step | Should show |
| --- | --- | --- |
| `github-use-template.png` | 1 | The starter's repo page, with the green **Use this template** button and its **Create a new repository** option |
| `supabase-sql-editor.png` | 2 | The SQL Editor with `0001_base.sql` pasted, after **Run**, showing **Success. No rows returned** |
| `supabase-connect-keys.png` | 2 | The **Connect** dialog, with the Project URL and the publishable key highlighted (key blurred) |
| `google-oauth-client.png` | 3 | Google Auth Platform, **Clients**, **Create client**: Web application, with the Supabase callback URL under **Authorised redirect URIs** |
| `supabase-google-provider.png` | 3 | Supabase **Authentication**, **Sign In / Providers**, **Google**: enabled, Client ID filled in, secret blurred, Callback URL visible |
| `vercel-env-vars.png` | 4 | Vercel's import screen with **Environment Variables** open and both Supabase names filled in (values blurred) |
| `supabase-url-config.png` | 5 | Supabase **Authentication**, **URL Configuration**: Site URL set to a vercel.app link, and both redirect URLs listed |
