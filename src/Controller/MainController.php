<?php

namespace App\Controller;

use App\Entity\Message;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\JsonResponse;

class MainController extends AbstractController
{
    #[Route('/', name: 'app_main')]
    public function index()
    {
        return $this->render(view: 'ask/ask.html.twig');
    }

    #[Route('/send', name: 'msg', methods:"POST")]
    public function send(Request $request, ManagerRegistry $doctrine)
    {
        $result = false;
        $params = $request->request->all();
        foreach ($params as $value) {
            if (empty($value)){
                $result = false;
            }else{
                $result = true;
            }
        }

        $result ? $this->addFlash('success', "Köszönjük szépen a kérdésedet. Válaszunkkal hamarosan keresünk a megadott e-mail címen.") : $this->addFlash('success', "Hiba! Kérjük töltsd ki az összes mezőt!");
        
        if($result){
            $entityManager = $doctrine->getManager();

            $product = new Message();
            $product->setName($request->get("name"));
            $product->setEmail($request->get("email"));
            $product->setMessage($request->get("message"));

            $entityManager->persist($product);
            $entityManager->flush();
        }
 
        return $this->redirectToRoute('app_main');
        
    }

    #[Route('/api/send', name: 'apimsg', methods:"POST")]
    public function apisend(Request $request, ManagerRegistry $doctrine)
    {
        $result = false;
        $params = $request->request->all();
        foreach ($params as $value) {
            if (empty($value)){
                $result = false;
            }else{
                $result = true;
            }
        }
        
        if($result){
            $entityManager = $doctrine->getManager();

            $product = new Message();
            $product->setName($request->get("name"));
            $product->setEmail($request->get("email"));
            $product->setMessage($request->get("message"));

            $entityManager->persist($product);
            $entityManager->flush();

            return new JsonResponse(['success' => "Köszönjük szépen a kérdésedet. Válaszunkkal hamarosan keresünk a megadott e-mail címen."]);
        }
        else{
            return new JsonResponse(['success' => "Hiba! Kérjük töltsd ki az összes mezőt!"]);

        }
    }


}