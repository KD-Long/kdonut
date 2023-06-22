# Note to self

Test for push to repository to update sub domain kdonut.kyledlong.com on hostinger.

## Workflow

1) Git push from local --> main branch
```bash
git add --all
git commit -m 'commmit msg'
git push -u origin main
```
2) Github actions trigger build --> build branch (dist folder from $npm run build)

3) Webhook event triggered --> hostinger

4) Automatic deployment --> ~/public_html/_sub_kdonut/

5) Configured sub domain kdonut.kyledlong.com to point to "_sub_kdonut/" folder




