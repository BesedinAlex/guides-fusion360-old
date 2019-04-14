class Annotations {
    static annotations;

    static async init() {
        Annotations.annotations = await Annotations.getAnnotations();
        for (const i in Annotations.annotations)
            Annotations.addAnnotation(i);
    }

    static update() {
        for (const i in Annotations.annotations) {
            // @ts-ignore
            const p2 = new THREE.Vector3(Annotations.annotations[i].x, Annotations.annotations[i].y, Annotations.annotations[i].z);
            const model = document.querySelector('#model') as HTMLFormElement;
            const annotation = document.querySelector('#annotation-' + i) as HTMLFormElement;
            const annotationIndex = document.querySelector('#annotation-index-' + i) as HTMLFormElement;
            p2.project(camera);
            p2.x = Math.round((p2.x + 1) * model.width / 2 / window.devicePixelRatio);
            p2.y = Math.round((-p2.y + 1) * model.height / 2 / window.devicePixelRatio);
            annotation.style.left = p2.x + "px";
            annotation.style.top = p2.y + "px";
            annotationIndex.style.left = p2.x - 15 + "px";
            annotationIndex.style.top = p2.y - 15 + "px";
        }
        Annotations.changeVisibilityOfAnnotations();
    }

    private static async getAnnotations () {
        const response = await fetch('content/' + modelIndex + '/annotations.json');
        return await response.json();
    }

    private static addAnnotation(index) {
        const annotation = document.createElement('div');
        annotation.id = 'annotation-' + index;
        annotation.classList.add('annotation', 'hidden');
        const annotationText = document.createElement('p');
        annotationText.id = 'annotation-text-' + index;
        annotation.appendChild(annotationText);
        const annotationNumber = document.createElement('div');
        annotationNumber.id = 'annotation-index-' + index;
        annotationNumber.classList.add('annotation-number');
        annotationNumber.innerText = (+index + 1).toString();
        annotationNumber.addEventListener('click', () => Annotations.hideAnnotation(index));
        const body = document.querySelector('body');
        body.appendChild(annotation);
        body.appendChild(annotationNumber);
    }

    private static hideAnnotation(index) {
        const annotation = document.querySelector('#annotation-' + index);
        const hidden = annotation.classList.contains('hidden');
        document.querySelector('#annotation-text-' + index).innerHTML = hidden ? Annotations.annotations[index].text : '';
        if (hidden)
            annotation.classList.remove('hidden');
        else
            annotation.classList.add('hidden');
    }

    private static getClosestAnnotation() {
        let indexOfClosest;
        let distToClosest = Math.pow(2, 32);
        for (const i in Annotations.annotations) {
            const camPos = camera.position;
            const pPos = Annotations.annotations[i];
            const dist = Math.sqrt(Math.pow((camPos.x - pPos.x),2) + Math.pow((camPos.y - pPos.y),2) + Math.pow((camPos.z - pPos.z),2));
            if (distToClosest > dist) {
                distToClosest = dist;
                indexOfClosest = +i;
            }
        }
        return indexOfClosest;
    }

    private static changeVisibilityOfAnnotations() {
        for (const i in Annotations.annotations) {
            const annotation = document.querySelector('#annotation-' + i) as HTMLFormElement;
            const annotationNumber = document.querySelector('#annotation-index-' + i) as HTMLFormElement;
            annotation.style.zIndex = Annotations.getClosestAnnotation() === +i ? '1' : '0';
            annotationNumber.style.zIndex = Annotations.getClosestAnnotation() === +i ? '1' : '0';
        }
    }
}
