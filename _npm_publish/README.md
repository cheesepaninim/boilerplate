npm publish
===========
--- 

1. package.json
    - must have
        - name / version ( ready to publish )
        - how to write version: [versioner](https://docs.npmjs.com/misc/semver)
        
    - nice to have
        - homepage / bugs / license / author / contribuotrs / main / repository / files / browser / engines
        - files field is not necessary   
            (if not exists npm publish not in .npmignore)

2. LICENSE

3. README.md

4. .npmignore

5. npm publish
    - npm login
        - get account from [npmjs.com](https://www.npmjs.com/)
    
        [ terminal ]
           
          $ npm login
          $ {enter_id}
          $ {enter_password}
          $ {enter_email}

    - npm publish
    
        [ terminal ]
        
          $ npm publish
          
        - 403 error
            - check package name if already exist
            - check id / pwd / email
