Run the command

```ts
pulumi stack init my-demo-project
```

```bash
pulumi config set aws:region us-west-2
```

Then:

```bash
npm install
```

Then:

```bash
pulumi up --preview
```

```bash
pulumi destroy --yes
```

```bash
pulumi stack rm
```
