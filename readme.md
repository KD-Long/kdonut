# Note to self

Test for push to repository to update sub domain kdonut.kyledlong.com on hostinger.

## Workflow

git push from local --> main branch
git hub actions trigger build --> build branch (dist folder from $npm run build)
Webhook event triggered --> hostinger
automatic deployment --> ~/public_html/_sub_kdonut/
configured sub domain kdonut.kyledlong.com to point to _sub_kdonut/ folder


